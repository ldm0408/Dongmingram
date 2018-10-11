import React from "react";
import styles from "./styles.scss";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";

const PhotoActions = (props, context) => {
  return (
    <div className={styles.actions}>
      <div className={styles.icons}>
        <span className={styles.icon} onClick={props.handleHeartClick}>
          {props.is_liked ? (
            <Ionicon icon="ios-heart" fontSize="28px" color="#EB4B59" />
          ) : (
            <Ionicon icon="ios-heart-outline" fontSize="28px" color="black" />
          )}
        </span>
        <span className={styles.icon}>
          <Ionicon icon="ios-text-outline" fontSize="30px" color="black" />
        </span>
      </div>
      <span className={styles.likes} onClick={props.openLikes}>
        {props.number}{" "}
        {props.number === 1 ? context.t("like") : context.t("likes")}
      </span>
    </div>
  );
};

PhotoActions.contextTypes = {
  t: PropTypes.func.isRequired
};

PhotoActions.propTypes = {
  number: PropTypes.number.isRequired,
  is_liked: PropTypes.bool.isRequired,
  photoId: PropTypes.number.isRequired,
  handleHeartClick: PropTypes.func.isRequired,
  openLikes: PropTypes.func.isRequired
};

export default PhotoActions;
