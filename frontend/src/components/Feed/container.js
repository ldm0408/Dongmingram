import React, { Component } from "react";
import PropTypes from "prop-types";
import Feed from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };
  static propTypes = {
    getFeed: PropTypes.func.isRequired,
    feed: PropTypes.array
  };

  componentDidMount() {
    const { getFeed } = this.props; // 최초 렌더가 되면 getFeed()가 동작 하여 feed prop을 불러온다
    if (!this.props.feed) {
      getFeed();
    } else {
      this.setState({ loading: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    // Feed component를 다시 불러 올 때 feed prop 이 있을 시(feed API 를 다시 불러오지 않게 한다
    if (nextProps.feed) {
      this.setState({ loading: false });
    }
  }
  render() {
    const { feed } = this.props;
    return <Feed {...this.state} feed={feed} />;
  }
}

export default Container;
