import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import initialState from "./initialState";
import reducer from "./reducer";
import actions from "./actions";

/** React Context **/
const AdminContext = createContext(undefined);

/** Context Provider **/
function AdminProvider({ children }) {
  const [newState, dispatch] = useReducer(reducer, initialState);
  const newActions = actions(dispatch, newState);

  return (
    <AdminContext.Provider value={[newState, newActions]}>
      {children}
    </AdminContext.Provider>
  );
}

/** Hook wrapper for useContext **/
export const useAdminContext = () => {
  const ctx = useContext(AdminContext);

  if (!ctx) {
    throw new Error("useAdminContext must be used within AdminProvider");
  }
  return ctx;
};

AdminProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AdminProvider;
