import { Icon } from "../icon/Icon";
import PropTypes from "prop-types";

import "./AlertBanner.scss";

export function AlertBanner({
  type = "warning",
  alertMessage,
  showAlert,
  onClose,
}) {
  return (
    <div
      className={`alert-banner alert-banner-${type} ${
        !showAlert ? "hidden" : ""
      }`}
      aria-hidden={!showAlert}
    >
      <figure>
        <Icon i="warning" />
      </figure>
      <div className="message">
        <h2>Message {type}:</h2>
        {alertMessage || "Network Error"}
      </div>
      {onClose && (
        <button onClick={onClose}>
          <Icon i="close" />
        </button>
      )}
    </div>
  );
}

AlertBanner.propTypes = {
  onClose: PropTypes.func,
  showAlert: PropTypes.bool,
  alertMessage: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["error", "success", "warning", "info"]),
};

export default AlertBanner;
