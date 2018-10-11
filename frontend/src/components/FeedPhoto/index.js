import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // 여기서 ownProps는 Feed/presenter.js 에서 PhotoActions 컴포넌트로 넘겨준 props이다.
    getPhotoLikes: () => {
      dispatch(userActions.getPhotoLikes(ownProps.id));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
