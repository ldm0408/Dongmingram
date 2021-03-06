import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import LoginForm from "components/LoginForm";
import SignupForm from "components/SignupForm";

const Auth = (props, context) => {
  return (
    <main className={styles.auth}>
      <div className={styles.column}>
        <img
          src={require("images/phone.png")}
          alt={context.t("Checkout our App")}
        />
      </div>
      <div className={styles.column}>
        <div className={`${styles.whiteBox} ${styles.formBox}`}>
          <div className={styles.logo}>
            <img src={require("images/logo.png")} alt="logo" />
          </div>
          {props.action === "login" && <LoginForm />}
          {props.action === "signup" && <SignupForm />}
        </div>
        <div className={styles.whiteBox}>
          {props.action === "login" && (
            <p className={styles.text}>
              {context.t("Don't have an account?")}{" "}
              <span className={styles.changeLink} onClick={props.changeAction}>
                {context.t("Sign up")}
              </span>
            </p>
          )}
          {props.action === "signup" && (
            <p className={styles.text}>
              {context.t("Have an account?")}{" "}
              <span className={styles.changeLink} onClick={props.changeAction}>
                {context.t("Log in")}
              </span>
            </p>
          )}
        </div>

        <div className={styles.appBox}>
          <span>{context.t("Get the App")}</span>
          <div className={styles.appstores}>
            <img
              src={require("images/apple.png")}
              alt={context.t("Download it on the Appel App Store")}
            />
            <img
              src={require("images/android.png")}
              alt={context.t("Download it on the Android App Store")}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

Auth.contextTypes = {
  t: PropTypes.func.isRequired
};
export default Auth;
