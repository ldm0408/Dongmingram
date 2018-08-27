// Imports

// Actions

// Action Creators

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

// Reducer Exports
export default reducer;
