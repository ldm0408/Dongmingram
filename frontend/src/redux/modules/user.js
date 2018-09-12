// Imports

// Actions
const SAVE_TOKEN = "SAVE_TOKEN";

// Action Creators
function saveToken(token) {
  return {
    type: SAVE_TOKEN,
    token
  };
}

// API Actions
function facebookLogin(access_token) {
  return d => {
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
        if (json.token) {
          localStorage.setItem("jwt", json.token);
          d(saveToken(json.token));
        }
      })
      .catch(err => console.log(err));
  };
}

// Initial State
const initialState = {
  isLoggedIn: localStorage.getItem("jwt") ? true : false
};

// Reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_TOKEN:
      return applySetToken(state, action);
    default:
      return state;
  }
}

// Reducer Functions
function applySetToken(state, action) {
  const { token } = action;
  return {
    ...state,
    isLoggedIn: true,
    token
  };
}

// Exports
const actionCreators = {
  facebookLogin
};
export { actionCreators };

// Reducer Exports
export default reducer;
