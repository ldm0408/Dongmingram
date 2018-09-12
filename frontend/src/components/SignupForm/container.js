import React, { Component } from "react";
import PropTypes from "prop-types";
import SignupForm from "./presenter";

class Container extends Component {
  state = {
    email: "",
    name: "",
    username: "",
    password: ""
  };

  static propTypes = {
    facebookLogin: PropTypes.func.isRequired,
    createAccount: PropTypes.func.isRequired
  };

  render() {
    return (
      <SignupForm
        emailValue={this.state.email}
        nameValue={this.state.name}
        usernameValue={this.state.username}
        passwordValue={this.state.password}
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handleSubmit}
        handleFacebookLogin={this._handleFacebookLogin}
      />
    );
  }

  _handleInputChange = event => {
    const {
      target: { value, name }
    } = event;

    this.setState({
      [name]: value
    });
  };

  _handleSubmit = event => {
    const { createAccount } = this.props;
    const { email, name, username, password } = this.state;

    event.preventDefault();
    createAccount(username, password, email, name);
  };
  _handleFacebookLogin = response => {
    const { facebookLogin } = this.props;
    facebookLogin(response.accessToken);
  };
}
export default Container;
