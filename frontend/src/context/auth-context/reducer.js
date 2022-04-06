/** REDUCER **/
import types from "./types";

const reducer = (state, action) => {
  const newState = { ...state };

  switch (action.type) {
    case types.SET_AUTH_STATUS:
      newState.authStatus = action.payload.authStatus;
      newState.authorized = action.payload.authorized;
      newState.expiration = action.payload.expiration;
      break;
    default:
      throw new Error(`Unknown type ${action.type}`);
  }

  return newState;
};

export default reducer;
