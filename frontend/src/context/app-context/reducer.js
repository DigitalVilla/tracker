/** REDUCER **/
import types from "./types";

const reducer = (state, action) => {
  const newState = { ...state };

  switch (action.type) {
    case types.SET_APP_STATUS:
      newState.status = action.payload.status;
      break;
    case types.SET_INITIAL_STATE:
      newState.entries = action.payload.entries;
      newState.maxCals = action.payload.maxCals;
      newState.budget = action.payload.budget;
      newState.email = action.payload.email;
      newState.username = action.payload.username;
      newState.age = action.payload.age;
      newState.status = action.payload.status;
      break;
    default:
      throw new Error(`Unknown type ${action.type}`);
  }

  // console.log(newState, action.payload);

  return newState;
};

export default reducer;
