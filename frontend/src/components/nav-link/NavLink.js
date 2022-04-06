import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "../icon/Icon";

export function NavLink({ path, icon, label, active, style = "", onClick }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const to = (e) => {
    if (onClick) onClick(e);
    void navigate(path);
  };

  return (
    <button
      role="listitem"
      className={pathname === path ? `${style} ${active}` : style}
      onClick={to}
    >
      {icon && <Icon i={icon} />} <span>{label}</span>
    </button>
  );
}

NavLink.propTypes = {
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  style: PropTypes.string,
  active: PropTypes.string,
};

export default NavLink;
