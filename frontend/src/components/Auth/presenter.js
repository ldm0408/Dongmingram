import React from "react";
import styles from "./styles.scss";
import { LoginForm, SignupForm } from "components/AuthForms";

const Auth = (props, context) => {
  console.log(props);
  return (
    <main className={styles.auth}>
      <div className={styles.column}>
        <img src={require("images/phone.png")} alt="Checkout our App" />
      </div>
      <div className={styles.column}>
        <div className={`${styles.whiteBox} ${styles.fromBox}`}>
          <img src={require("images/logo.png")} alt="logo" />
          {props.action === "login" && <LoginForm />}
          {props.action === "signup" && <SignupForm />}
        </div>
        <div className={styles.whiteBox}>
          {props.action === "login" && (
            <p>
              Don't have an account?{" "}
              <span className={styles.changeLink} onClick={props.changeAction}>
                Sign up
              </span>
            </p>
          )}
          {props.action === "signup" && (
            <p>
              Have an account?{" "}
              <span className={styles.changeLink} onClick={props.changeAction}>
                Log in
              </span>
            </p>
          )}
        </div>

        <div className={styles.appBox}>
          <span>Get the App</span>
          <div className={styles.appstores}>
            <img
              src={require("images/apple.png")}
              alt="Download it on the Appel App Store"
            />
            <img
              src={require("images/android.png")}
              alt="Download it on the Android App Store"
            />
          </div>
        </div>
      </div>
    </main>
  );
};
export default Auth;
