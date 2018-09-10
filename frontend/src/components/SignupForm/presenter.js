import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import styles from "shared/formStyles.scss";

const SignupForm = (props, context) => (
  <div className={styles.formComponent}>
    <h2 className={styles.signupHeader}>
      {context.t("Sign up to see photos and videos from your friends")}
    </h2>
    <button className={styles.button}>
      {" "}
      <Ionicon icon="logo-facebook" fontSize="20px" color="white" />
      {context.t("Log in with Facebook")}
    </button>
    <span className={styles.divider}>{context.t("or")}</span>
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <input
        className={styles.textInput}
        type="email"
        placeholder={context.t("Email")}
        value={props.emailValue}
        name="email"
        onChange={props.handleInputChange}
      />
      <input
        className={styles.textInput}
        type="text"
        placeholder={context.t("Full Name")}
        value={props.nameValue}
        name="name"
        onChange={props.handleInputChange}
      />
      <input
        className={styles.textInput}
        type="username"
        placeholder={context.t("Username")}
        value={props.usernameValue}
        name="username"
        onChange={props.handleInputChange}
      />
      <input
        className={styles.textInput}
        type="password"
        placeholder={context.t("Password")}
        value={props.passwordValue}
        name="password"
        onChange={props.handleInputChange}
      />
      <input
        className={styles.button}
        value={context.t("Sign Up")}
        type="submit"
      />
    </form>
    <p className={styles.terms}>
      {context.t("By signing up, you agree to our")}{" "}
      <span>{context.t("Terms & PrivacyPolicy")}</span>
    </p>
  </div>
);

SignupForm.propTypes = {
  emailValue: PropTypes.string.isRequired,
  nameValue: PropTypes.string.isRequired,
  usernameValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

SignupForm.contextTypes = {
  t: PropTypes.func.isRequired
};

export default SignupForm;
