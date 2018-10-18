import React, { Component } from "react";
import PropTypes from "prop-types";
import Explore from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };
  static propTypes = {
    getExplore: PropTypes.func.isRequired,
    userList: PropTypes.array
  };

  componentDidMount() {
    const { getExplore } = this.props; // 최초 렌더가 되면 getExplore()가 동작 하여 userList prop을 불러온다
    if (!this.props.userList) {
      getExplore();
    } else {
      this.setState({ loading: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    // userList component를 다시 불러 올 때 userList prop 이 있을 시(userList API 를 다시 불러오지 않게 한다
    if (nextProps.userList) {
      this.setState({ loading: false });
    }
  }
  render() {
    const { userList } = this.props;
    return <Explore {...this.state} userList={userList} />;
  }
}

export default Container;
