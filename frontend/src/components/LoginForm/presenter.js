import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import styles from "shared/formStyles.scss";

const LoginForm = (props, context) => (
  <div className={styles.formComponent}>
    <form className={styles.form}>
      <input
        className={styles.textInput}
        type="text"
        placeholder={context.t("Username")}
      />
      <input
        className={styles.textInput}
        type="password"
        placeholder={context.t("Password")}
      />
      <input
        className={styles.button}
        value={context.t("Log In")}
        type="submit"
      />
    </form>
    <span className={styles.divider}>{context.t("or")}</span>
    <span className={styles.facebookLink}>
      <Ionicon icon="logo-facebook" fontSize="20px" color="#385185" />
      {context.t("Log in with Facebook")}
    </span>
    <span className={styles.forgotLink}>{context.t("Forgot Password?")}</span>
  </div>
);

LoginForm.contextTypes = {
  t: PropTypes.func.isRequired
};

export default LoginForm;
