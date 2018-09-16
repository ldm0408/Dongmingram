import React from "react";
import styles from "./styles.scss";

const Loading = props => {
  return (
    <div className={styles.container}>
      <img
        className={styles.spinner}
        src={require("images/loading.png")}
        alt="loading"
      />
    </div>
  );
};

export default Loading;
