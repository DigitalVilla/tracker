import { createContext, useContext, useReducer } from "react";
import initialState from "./initialState";
import PropTypes from "prop-types";
import reducer from "./reducer";
import actions from "./actions";

/** React Context **/
const AppContext = createContext(undefined);

/** Context Provider **/
function AuthProvider({ children }) {
  const [newState, dispatch] = useReducer(reducer, initialState);
  const newActions = actions(dispatch, newState);

  return (
    <AppContext.Provider value={[newState, newActions]}>
      {children}
    </AppContext.Provider>
  );
}

/** Hook wrapper for useContext **/
export const useAuthContext = () => {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return ctx;
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AuthProvider;
