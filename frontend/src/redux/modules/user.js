// Imports

// Actions
const SAVE_TOKEN = "SAVE_TOKEN";
const LOGOUT = "LOGOUT";
const SET_USER_LIST = "SET_USER_LIST";
const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";

// Action Creators
function saveToken(json) {
  return {
    type: SAVE_TOKEN,
    token: json.token,
    username: json.user.username
  };
}

function logout() {
  return {
    type: LOGOUT
  };
}

function setUserList(userList) {
  return {
    type: SET_USER_LIST,
    userList: userList
  };
}

function setFollowUser(userId) {
  return {
    type: FOLLOW_USER,
    userId
  };
}
function setUnfollowUser(userId) {
  return {
    type: UNFOLLOW_USER,
    userId
  };
}

// API Actions
function facebookLogin(access_token) {
  return dispatch => {
    fetch("/users/login/facebook/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        access_token
      })
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);

        if (json.token) {
          dispatch(saveToken(json));
        }
      })
      .catch(err => console.log(err));
  };
}

function usernameLogin(username, password) {
  return dispatch => {
    // django-rest-auth 의 login API
    fetch("/rest-auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.token) {
          dispatch(saveToken(json));
        }
      })
      .catch(err => console.log(err));
  };
}

function createAccount(username, password, email, name) {
  return dispatch => {
    fetch("/rest-auth/registration/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password1: password,
        password2: password,
        email,
        name
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          dispatch(saveToken(json.token));
        }
      });
  };
}

function getPhotoLikes(photoId) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/images/${photoId}/likes/`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setUserList(json));
      });
  };
}

function followUser(userId) {
  return (dispatch, getState) => {
    dispatch(setFollowUser(userId));
    const {
      user: { token }
    } = getState();
    fetch(`/users/${userId}/follow/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(logout());
      } else if (!response.ok) {
        dispatch(setUnfollowUser(userId)); // API 요청 실패 시 상태를 원래대로 돌려 놓는다
      }
    });
  };
}
function unfollowUser(userId) {
  return (dispatch, getState) => {
    dispatch(setUnfollowUser(userId));
    const {
      user: { token }
    } = getState();
    fetch(`/users/${userId}/unfollow/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(logout());
      } else if (!response.ok) {
        dispatch(setFollowUser(userId)); // API 요청 실패 시 상태를 원래대로 돌려 놓는다
      }
    });
  };
}

function getExplore() {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/users/explore/`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setUserList(json));
      });
  };
}

// Initial State
const initialState = {
  isLoggedIn: localStorage.getItem("jwt") ? true : false,
  token: localStorage.getItem("jwt")
};

// Reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_TOKEN:
      return applySetToken(state, action);
    case LOGOUT:
      return applyLogout(state, action);
    case SET_USER_LIST:
      return applySetUserList(state, action);
    case FOLLOW_USER:
      return applyFollowUser(state, action);
    case UNFOLLOW_USER:
      return applyUnfollowUser(state, action);
    default:
      return state;
  }
}

// Reducer Functions
function applySetToken(state, action) {
  console.log(action);
  const { token } = action;
  const { username } = action;
  localStorage.setItem("jwt", token);
  localStorage.setItem("username", username);
  return { ...state, isLoggedIn: true, token };
}

function applyLogout(state, actioin) {
  localStorage.removeItem("jwt");
  return {
    isLoggedIn: false
  };
}

function applySetUserList(state, action) {
  const { userList } = action;
  return {
    ...state,
    userList
  };
}
function applyFollowUser(state, action) {
  const { userId } = action;
  const { userList } = state;
  const updatedUserList = userList.map(user => {
    if (user.id === userId) {
      return { ...user, following: true };
    }
    return user;
  });
  return { ...state, userList: updatedUserList };
}

function applyUnfollowUser(state, action) {
  const { userId } = action;
  const { userList } = state;
  const updatedUserList = userList.map(user => {
    if (user.id === userId) {
      return { ...user, following: false };
    }
    return user;
  });
  return { ...state, userList: updatedUserList };
}

// Exports
const actionCreators = {
  facebookLogin,
  usernameLogin,
  createAccount,
  logout,
  getPhotoLikes,
  followUser,
  unfollowUser,
  getExplore
};
export { actionCreators };

// Reducer Exports
export default reducer;
