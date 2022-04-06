import PropTypes from "prop-types";
import { Icons } from "./iconList";
import styles from "./Icon.module.scss";

export const Icon = ({ i, className = "", ...rest }) => {
  const I = Icons[i];
  return !I ? (
    <h1 className={styles.notFound}>{i}</h1>
  ) : (
    <svg
      className={`${styles.icon} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${i} icon`}
      role="graphics-document"
      viewBox={I.viewBox}
      {...rest}
    >
      {I.path.map((p, i) => {
        if (typeof p === "string")
          return <path key={`${p.substring(0, 10)}-${i}`} d={p} />;
        return <path key={`${p.d.substring(0, 10)}-${i}`} {...p} />;
      })}
    </svg>
  );
};

Icon.propTypes = {
  className: PropTypes.string,
  i: PropTypes.oneOf([
    "about",
    "arrowDown",
    "arrowLeft",
    "arrowRight",
    "cup",
    "roadmap",
    "racing",
    "brandLogo",
    "discord",
    "twitter",
    "instagram",
    "select",
  ]),
};

export default Icon;
