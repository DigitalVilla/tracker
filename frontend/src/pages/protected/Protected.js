import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useAuthContext } from "../../context/auth-context";
import { Outlet, useNavigate } from "react-router-dom";

/**
 * Handles routes that do need auth
 * If theres is no auth it rediects out
 */
export function Protected({ redirect }) {
  const [state, actions] = useAuthContext();
  const navigate = useNavigate();
  const isMounted = useRef(false);

  useEffect(() => {
    // Restore session on app mount
    const initSession = async () => {
      const hasSession = await actions.restoreSession();
      !hasSession && navigate(redirect, { replace: true });
      isMounted.current = hasSession;
    };

    initSession();
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    // Redirect ot of protected route  if auth status changes from auth
    if (isMounted.current && state.authStatus !== "auth") {
      void navigate(redirect, { replace: true });
    }
  }, [state.authStatus]);

  useEffect(() => {
    // Validate expiration on page changes
    if (isMounted.current && state.authStatus === "auth") {
      actions.validateSession();
    }
  });

  return state.authStatus === "auth" ? <Outlet /> : null;
}

Protected.propTypes = {
  redirect: PropTypes.string.isRequired,
};

export default Protected;
