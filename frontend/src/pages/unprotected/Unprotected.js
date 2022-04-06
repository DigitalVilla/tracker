import { useEffect } from "react";
import PropTypes from "prop-types";
import { useAuthContext } from "../../context/auth-context";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { page } from "../../appTypes";

/**
 * Handles routes that do not need auth
 * if theres is auth it redirects out
 * @param {*} param0
 * @returns
 */
export function Unprotected({ redirect }) {
  const [state, actions] = useAuthContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    // Restore session on app mount
    const initSession = async () => {
      await actions.restoreSession();
    };

    initSession();
  }, []);

  useEffect(() => {
    if (state.authStatus !== "expired") {
      // on auth  redirect to home
      navigate(redirect, { replace: true });
    } else if (pathname !== page.SIGNIN) {
      // Cath for all incorrect urls instead of 404 page
      navigate(page.SIGNIN, { replace: true });
    }
  }, [state.authStatus]);

  return state.authStatus === "expired" ? <Outlet /> : null;
}

Unprotected.propTypes = {
  redirect: PropTypes.string.isRequired,
};

export default Unprotected;
