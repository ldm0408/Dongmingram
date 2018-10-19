import React, { Component } from "react";
import UserRow from "./presenter";

class Container extends Component {
  render() {
    console.log(this.props);
    return <UserRow {...this.props} {...this.state} />;
  }
}
export default Container;
