import PropTypes from "prop-types";
import styles from "./Loader.module.scss";

export const Loader = ({ isLoading = true, ...rest }) => {
  return (
    <div
      className={`${styles.loader} ${isLoading ? styles.active : "hidden"}`}
      aria-label="loading..."
      aria-hidden={!isLoading}
      {...rest}
    >
      {isLoading && (
        <div className={styles.loaderWrapper}>
          <div className="loader">Loading...</div>
        </div>
      )}
    </div>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool,
};

export default Loader;
