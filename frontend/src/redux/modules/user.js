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
        if (json.token) {
          localStorage.setItem("jwt", json.token);
          dispatch(saveToken(json.token));
        }
      })
      .catch(err => console.log(err));
  };
}

function usernameLogin(username, password) {
  return dispatch => {
    // django-rest-auth 의 login API 이다. / https://django-rest-auth.readthedocs.io/en/latest/api_endpoints.html 참고
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
        if (json.token) {
          dispatch(saveToken(json.token));
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
  localStorage.setItem("jwt", token);
  return {
    ...state,
    isLoggedIn: true,
    token
  };
}

// Exports
const actionCreators = {
  facebookLogin,
  usernameLogin
};
export { actionCreators };

// Reducer Exports
export default reducer;
