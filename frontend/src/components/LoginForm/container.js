import React, { Component } from "react";
import LoginForm from "./presenter";

class Container extends Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    return (
      <LoginForm
        usernameValue={this.state.username}
        passwordValue={this.state.password}
        handleInputChange={this._handleInputChange}
        handleFacebookLogin={this._handleFacebookLogin}
        handleSubmit={this._handleSubmit}
      />
    );
  }

  _handleInputChange = event => {
    const {
      target: { value, name }
    } = event;
    this.setState({
      [name]: value // 바로 위의 name 변수(const name = event.target.name)을 이용해서 해당 값과 일치하는 state key 값을 바꾸게 한다
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
