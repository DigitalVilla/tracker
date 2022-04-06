import { useEffect } from "react";
import PropTypes from "prop-types";
import { useAuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { page } from "../../appTypes";
import styles from "./PageLayout.module.scss";
import { Loader } from "..";

export function PageLayout({ children, needsAuth, isLoading, className = "" }) {
  const navigate = useNavigate();
  const [state] = useAuthContext();

  useEffect(() => {
    if (needsAuth && !state.authorized) {
      void navigate(page.HOME);
    }
  }, [state.authorized]);

  return (needsAuth && state.authorized) || !needsAuth ? (
    <div className={`${styles.pageLayout}`}>
      {isLoading ? (
        <Loader />
      ) : (
        <main className={`${styles.content} ${className}`}>{children}</main>
      )}
    </div>
  ) : null;
}

PageLayout.propTypes = {
  isLoading: PropTypes.bool,
  needsAuth: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default PageLayout;
