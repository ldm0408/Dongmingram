// Imports

// Actions

// Action Creators

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
      .then(json => console.log(json))
      .catch(err => console.log(err));
  };
}

// Initial State
const initialState = {
  isLoggedIn: localStorage.getItem("jwt") || false
};

// Reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

// Reducer Functions

// Exports
const actionCreators = {
  facebookLogin
};
export { actionCreators };

// Reducer Exports
export default reducer;
