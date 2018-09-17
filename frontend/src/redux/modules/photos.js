// Imports
import { actionCreators as userAction } from "redux/modules/user";
// Actions

// Action Creators

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
          console.log("LOGOUUTTT");
          dispatch(userAction.logout());
        }
        return response.json();
      })
      .then(json => console.log(json));
  };
}

// Initial State
const initialState = {};

// Reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

// Reducer Functions

// Exports
const actionCreators = { getFeed };
export { actionCreators };

// Reducer Exports
export default reducer;
