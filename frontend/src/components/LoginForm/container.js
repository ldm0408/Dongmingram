import React, { Component } from "react";
import PropTypes from "prop-types";
import LoginForm from "./presenter";

class Container extends Component {
  state = {
    username: "",
    password: ""
  };

  static propTypes = {
    facebookLogin: PropTypes.func.isRequired,
    usernameLogin: PropTypes.func.isRequired
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
    const { usernameLogin } = this.props;
    const { username, password } = this.state;

    event.preventDefault();
    usernameLogin(username, password);
  };
  _handleFacebookLogin = response => {
    const { facebookLogin } = this.props;
    facebookLogin(response.accessToken);
  };
}

export default Container;
