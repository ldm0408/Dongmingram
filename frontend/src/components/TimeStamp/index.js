import React from "react";
import styles from "./styles.scss";
import Proptypes from "prop-types";

const TimeStamp = (props, context) => (
  <span className={styles.time}>{props.time}</span>
);

TimeStamp.propTypes = {
  time: Proptypes.string.isRequired
};
TimeStamp.contextTypes = {
  t: Proptypes.func.isRequired
};

export default TimeStamp;
