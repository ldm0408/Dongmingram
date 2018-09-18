// Imports
import { actionCreators as userAction } from "redux/modules/user";
// Actions
const SET_FEED = "SET_FEED";
// Action Creators
function setFeed(feed) {
  return {
    type: SET_FEED,
    feed
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

// Initial State
const initialState = {};

// Reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_FEED:
      return applySetfeed(state, action);
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

// Exports
const actionCreators = { getFeed };
export { actionCreators };

// Reducer Exports
export default reducer;
