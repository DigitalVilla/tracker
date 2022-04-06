import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import initialState from "./initialState";
import reducer from "./reducer";
import actions from "./actions";

/** React Context **/
const AppContext = createContext(undefined);

/** Context Provider **/
function AppProvider({ children }) {
  const [newState, dispatch] = useReducer(reducer, initialState);
  const newActions = actions(dispatch, newState);

  return (
    <AppContext.Provider value={[newState, newActions]}>
      {children}
    </AppContext.Provider>
  );
}

/** Hook wrapper for useContext **/
export const useAppContext = () => {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return ctx;
};

AppProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AppProvider;
