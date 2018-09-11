import React from "react";
import PropTypes from "prop-types";
import FacebookLogin from "react-facebook-login";
import FormStyles from "shared/formStyles.scss";

const LoginForm = (props, context) => (
  <div className={FormStyles.formComponent}>
    <form className={FormStyles.form} onSubmit={props.handleSubmit}>
      <input
        className={FormStyles.textInput}
        type="text"
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
        value={context.t("Log In")}
        type="submit"
      />
    </form>
    <span className={FormStyles.divider}>{context.t("or")}</span>
    <FacebookLogin
      appId="284943952292490"
      autoLoad={false}
      fields="name,email,picture"
      cssClass={FormStyles.facebookLink}
      icon="fa-facebook-official"
      textButton={context.t("Log in with Facebook")}
      callback={props.handleFacebookLogin}
    />
    <span className={FormStyles.forgotLink}>
      {context.t("Forgot Password?")}
    </span>
  </div>
);

LoginForm.propTypes = {
  usernameValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleFacebookLogin: PropTypes.func.isRequired
};

LoginForm.contextTypes = {
  t: PropTypes.func.isRequired
};

export default LoginForm;
