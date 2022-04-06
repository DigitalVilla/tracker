import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./InputField.module.scss";

export const InputField = React.forwardRef(
  (
    {
      name = "",
      label = "",
      value = "",
      hideLabel = false,
      className = "",
      type = "text",
      max = 100,
      onBlur,
      regExp = "",
      onFastChange = null,
      placeholder = "",
      error = "",
      ...rest
    },
    ref,
  ) => {
    const [val, setVal] = useState(value);
    const [errorMessage, setErrorMessage] = useState(error);
    const showError = errorMessage.length > 0;

    useEffect(() => {
      setErrorMessage(error);
      return () => {};
    }, [error]);

    React.useEffect(() => {
      setVal(value);
    }, [value]);

    const handleChange = ({ target }) => {
      const { name, value } = target;
      if (value.length > max) return;

      if (onFastChange) {
        const newVal = onFastChange({ name, value });
        newVal !== undefined && setVal(newVal);
      } else if (regExp) {
        regExp.test(value) && setVal(value);
      } else {
        setVal(value);
      }
    };

    return (
      <div className={`${styles.input} ${className}`}>
        <label
          className={`${styles.label} ${hideLabel ? "hidden" : ""}`}
          htmlFor={`cubs-input-field-${name}`}
        >
          {label}
        </label>

        <input
          className={`${styles.field} ${showError ? styles.withError : ""}`}
          id={`cubs-input-field-${name}`}
          onChange={handleChange}
          value={val || ""}
          name={name}
          type={type}
          ref={ref}
          onBlur={onBlur}
          placeholder={placeholder}
          {...rest}
        />
        <div aria-hidden={!showError} className={`${styles.errorLog} ellipsis`}>
          {showError && errorMessage}
        </div>
      </div>
    );
  },
);

InputField.displayName = "InputField";
InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string,
  hideLabel: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  max: PropTypes.number,
  regExp: PropTypes.instanceOf(RegExp),
  onFastChange: PropTypes.func,
};

export default InputField;
