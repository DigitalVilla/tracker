/** REDUCER **/
import types from "./types";

const reducer = (state, action) => {
  const newState = { ...state };

  switch (action.type) {
    case types.SET_STATUS:
      newState.status = action.payload.status;
      break;
    case types.SET_INITIAL_STATE:
      newState.entries = action.payload.entries;
      newState.status = action.payload.status;
      break;
    default:
      throw new Error(`Unknown type ${action.type}`);
  }

  // console.log(newState, action.payload);

  return newState;
};

export default reducer;
