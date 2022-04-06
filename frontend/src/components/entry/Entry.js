import React from "react";
import PropTypes from "prop-types";
import styles from "./Entry.module.scss";
import { formatDate } from "../../utils";

export function Entry({ id, name, cals, date, price, email }) {
  return (
    <div className={styles.entry}>
      <div className={styles.header}>
        <span>{formatDate("{{mmm}}-{{dd}}-{{yy}}", date)}</span>
        {email && <span>{email}</span>}
      </div>

      <div className={styles.container}>
        <div className={styles.name}>{name}</div>

        <span>Calories: {cals}</span>
        <span>Price: ${price}</span>
        <button className={styles.button}>Edit</button>
        <button className={styles.button}>Delete</button>
      </div>
    </div>
  );
}

Entry.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  cals: PropTypes.number.isRequired,
  email: PropTypes.string,
  price: PropTypes.number,
};

export default Entry;
