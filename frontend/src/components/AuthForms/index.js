import React from "react";
import Ionicon from "react-ionicons";
import styles from "./styles.scss";

export const LoginForm = props => (
  <div className={styles.formComponent}>
    <form className={styles.form}>
      <input className={styles.textInput} type="text" placeholder="Username" />
      <input
        className={styles.textInput}
        type="password"
        placeholder="Password"
      />
      <input
        className={styles.button}
        value="Log In"
        type="submit"
        placeholder="Log In"
      />
    </form>
    <span className={styles.divider}>or</span>
    <span className={styles.facebookLink}>
      <Ionicon icon="logo-facebook" fontSize="20px" color="#385185" />
      Log in with Facebook
    </span>
    <span className={styles.forgotLink}>Forgot Password?</span>
  </div>
);

export const SignupForm = props => (
  <div className={styles.formComponent}>
    <h3 className={styles.signupHeader}>
      Sign up to see photos and videos from your friends
    </h3>
    <button className={styles.button}>
      {" "}
      <Ionicon icon="logo-facebook" fontSize="20px" color="white" />
      Log in with Facebook
    </button>
    <span className={styles.divider}>or</span>
    <form className={styles.form}>
      <input className={styles.textInput} type="email" placeholder="Email" />
      <input className={styles.textInput} type="text" placeholder="Full Name" />
      <input
        className={styles.textInput}
        type="username"
        placeholder="Username"
      />
      <input
        className={styles.textInput}
        type="password"
        placeholder="Password"
      />
      <input
        className={styles.button}
        value="Sign Up"
        type="submit"
        placeholder="Sign Up"
      />
    </form>
    <p className={styles.terms}>
      By signing up, you agree to our <span>Terms & PrivacyPolicy</span>
    </p>
  </div>
);
