import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as photoActions } from "redux/modules/photos";

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(ownProps);
  return {
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
