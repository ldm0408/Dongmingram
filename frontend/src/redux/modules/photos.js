// Imports
import { actionCreators as userAction } from "redux/modules/user";

// Actions
const SET_FEED = "SET_FEED";
const LIKE_PHOTO = "LIKE_PHOTO";
const UNLIKE_PHOTO = "UNLIKE_PHOTO";
const ADD_COMMENT = "ADD_COMMENT";

// Action Creators
function setFeed(feed) {
  return {
    type: SET_FEED,
    feed
  };
}
function doLikePhoto(photoId) {
  return {
    type: LIKE_PHOTO,
    photoId
  };
}
function doUnLikePhoto(photoId) {
  return {
    type: UNLIKE_PHOTO,
    photoId
  };
}

function addComment(photoId, comment) {
  return {
    type: ADD_COMMENT,
    photoId,
    comment
  };
}

// API Actions

function getFeed() {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch("/images/", {
      headers: { Authorization: `JWT ${token}` }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(userAction.logout());
        }
        return response.json();
      })
      .then(json => dispatch(setFeed(json)));
  };
}

function likePhoto(photoId) {
  return (dispatch, getState) => {
    dispatch(doLikePhoto(photoId)); // state 변경 및 뷰 변화 먼저 반영 후 API 요청--> Optimistic Update
    const {
      user: { token }
    } = getState();
    fetch(`/images/${photoId}/likes/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(userAction.logout());
      } else if (!response.ok) {
        dispatch(doUnLikePhoto(photoId)); // API 요청 실패 시 상태를 원래대로 돌려 놓는다
      }
    });
  };
}
function unLikePhoto(photoId) {
  return (dispatch, getState) => {
    dispatch(doUnLikePhoto(photoId)); // state 변경 및 뷰 변화 먼저 반영 후 API 요청--> Optimistic Update
    const {
      user: { token }
    } = getState();
    fetch(`/images/${photoId}/unlikes/`, {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(userAction.logout());
      } else if (!response.ok) {
        dispatch(doLikePhoto(photoId)); // API 요청 실패 시 상태를 원래대로 돌려 놓는다
      }
    });
  };
}

function commentPhoto(photoId, message) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/images/${photoId}/comments/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message
      })
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(userAction.logout());
        }
        return response.json();
      })
      .then(json => {
        if (json.message) {
          dispatch(addComment(photoId, json));
        }
      });
  };
}

// Initial State
const initialState = {};

// Reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_FEED:
      return applySetfeed(state, action);
    case LIKE_PHOTO:
      return applyLikePhoto(state, action);
    case UNLIKE_PHOTO:
      return applyUnLikePhoto(state, action);
    case ADD_COMMENT:
      return applyAddComment(state, action);
    default:
      return state;
  }
}

// Reducer Functions
function applySetfeed(state, action) {
  const { feed } = action;
  return {
    ...state,
    feed
  };
}

function applyLikePhoto(state, action) {
  const { feed } = state;
  const { photoId } = action;
  const updatedPhoto = feed.map(photo => {
    if (photo.id === photoId) {
      return { ...photo, is_liked: true, like_counter: photo.like_counter + 1 };
    }
    return photo;
  });
  return { ...state, feed: updatedPhoto };
}

function applyUnLikePhoto(state, action) {
  const { feed } = state;
  const { photoId } = action;
  const updatedPhoto = feed.map(photo => {
    if (photo.id === photoId) {
      return {
        ...photo,
        is_liked: false,
        like_counter: photo.like_counter - 1
      };
    }
    return photo;
  });
  return { ...state, feed: updatedPhoto };
}

function applyAddComment(state, action) {
  const { photoId, comment } = action;
  const { feed } = state;
  const updatedPhoto = feed.map(photo => {
    if (photo.id === photoId) {
      return { ...photo, comments: [...photo.comments, comment] };
    }
    return photo;
  });
  return { ...state, feed: updatedPhoto };
}

// Exports
const actionCreators = { getFeed, likePhoto, unLikePhoto, commentPhoto };
export { actionCreators };

// Reducer Exports
export default reducer;
