import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as photoActions } from "redux/modules/photos";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // 여기서 ownProps는 FeedPhoto/presenter.js 에서 PhotoActions 컴포넌트로 넘겨준 props이다.
    handleHeartClick: () => {
      if (ownProps.is_liked) {
        dispatch(photoActions.unLikePhoto(ownProps.photoId));
      } else {
        dispatch(photoActions.likePhoto(ownProps.photoId));
      }
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
