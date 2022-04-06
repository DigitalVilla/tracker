import { useEffect, useRef } from "react";
import { Loader } from "../../components";
import { useAuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { page } from "../../appTypes";

export function Signout(props) {
  const [state, actions] = useAuthContext();
  const isMounted = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    actions.signout();
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      if (state.authStatus === "expired") {
        void navigate(page.SIGNIN, { replace: true });
      }
    }
  }, [state.authStatus]);

  return <Loader />;
}

export default Signout;
