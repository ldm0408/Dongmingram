import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userAactions } from "redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    facebookLogin: access_token => {
      dispatch(userAactions.facebookLogin(access_token));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
