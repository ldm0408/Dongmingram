import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userAactions } from "redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    facebookLogin: access_token => {
      dispatch(userAactions.facebookLogin(access_token));
    },
    createAccount: (username, password, email, name) => {
      dispatch(userAactions.createAccount(username, password, email, name));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
