import React from "react";
import PropTypes from "prop-types";
import FacebookLogin from "react-facebook-login";
import FormStyles from "shared/formStyles.scss";

const SignupForm = (props, context) => (
  <div className={FormStyles.formComponent}>
    <h2 className={FormStyles.signupHeader}>
      {context.t("Sign up to see photos and videos from your friends")}
    </h2>
    <FacebookLogin
      appId="284943952292490"
      autoLoad={false}
      fields="name,email,picture"
      callback={props.handleFacebookLogin}
      cssClass={FormStyles.button}
      icon="fa-facebook-official"
      textButton={context.t("Log in with Facebook")}
    />
    <span className={FormStyles.divider}>{context.t("or")}</span>
    <form className={FormStyles.form} onSubmit={props.handleSubmit}>
      <input
        className={FormStyles.textInput}
        type="email"
        placeholder={context.t("Email")}
        value={props.emailValue}
        name="email"
        onChange={props.handleInputChange}
      />
      <input
        className={FormStyles.textInput}
        type="text"
        placeholder={context.t("Full Name")}
        value={props.nameValue}
        name="name"
        onChange={props.handleInputChange}
      />
      <input
        className={FormStyles.textInput}
        type="username"
        placeholder={context.t("Username")}
        value={props.usernameValue}
        name="username"
        onChange={props.handleInputChange}
      />
      <input
        className={FormStyles.textInput}
        type="password"
        placeholder={context.t("Password")}
        value={props.passwordValue}
        name="password"
        onChange={props.handleInputChange}
      />
      <input
        className={FormStyles.button}
        value={context.t("Sign Up")}
        type="submit"
      />
    </form>
    <p className={FormStyles.terms}>
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
  handleSubmit: PropTypes.func.isRequired,
  handleFacebookLogin: PropTypes.func.isRequired
};

SignupForm.contextTypes = {
  t: PropTypes.func.isRequired
};

export default SignupForm;
