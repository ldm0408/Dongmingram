import React from "react";
import styles from "./styles.scss";
import Ionicon from "react-ionicons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navigation = (props, context) => (
  <div className={styles.navigation}>
    <div className={styles.inner}>
      <div className={styles.column}>
        <Link to="/">
          <img
            className={styles.logo}
            src={require("images/logo.png")}
            alt={context.t("logo")}
          />
        </Link>
      </div>
      <div className={styles.column}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder={context.t("search")}
        />
      </div>
      <div className={styles.column}>
        <div className={styles.navIcon}>
          <Link to="/explore">
            <Ionicon icon="ios-compass-outline" fontSize="28px" color="black" />
          </Link>
        </div>
        <div className={styles.navIcon}>
          <Ionicon icon="ios-heart-outline" fontSize="28px" color="black" />
        </div>
        <div className={styles.navIcon}>
          <Link to="/profile">
            <Ionicon icon="ios-person-outline" fontSize="32px" color="black" />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

Navigation.contextTypes = {
  t: PropTypes.func.isRequired
};

export default Navigation;
