import React, { Component } from "react";
import SignupForm from "./presenter";

class Container extends Component {
  state = {
    email: "",
    name: "",
    username: "",
    password: ""
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
    event.preventDefault();
    console.log(this.state);
  };
  _handleFacebookLogin = response => {
    console.log(response);
  };
}
export default Container;
