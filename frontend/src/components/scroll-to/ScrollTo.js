import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

export function ScrollTo({
  children = "",
  block = "start",
  behavior = "smooth",
  isScrollable = true,
}) {
  const viewRef = useRef(null);

  useEffect(() => {
    if (isScrollable && viewRef.current) {
      viewRef.current.scrollIntoView({ behavior, block });
    }
  });

  return (
    <>
      {block === "end" && (
        <div aria-hidden="true" tabIndex={-1} ref={viewRef} />
      )}
      {children}
      {block === "start" && (
        <div aria-hidden="true" tabIndex={-1} ref={viewRef} />
      )}
    </>
  );
}

ScrollTo.propTypes = {
  isScrollable: PropTypes.bool,
  block: PropTypes.oneOf(["start", "end"]),
  behavior: PropTypes.oneOf(["smooth", "auto"]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ScrollTo;
