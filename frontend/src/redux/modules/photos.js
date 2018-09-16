// Imports

// Actions

// Action Creators

// API Actions

function getFeed() {
  return (dispatch, getState) => {
    console.log(getState());
    const {
      user: { token }
    } = getState();
    fetch("/images/", {
      headers: { Authorization: `JWT ${token}` }
    })
      .then(response => response.json())
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
