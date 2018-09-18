import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const FeedPhoto = props => {
  console.log(props);
  return <div className={styles.FeedPhoto}>FeedPhoto</div>;
};

FeedPhoto.propTypes = {
  creator: PropTypes.shape({
    profile_image: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  location: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
  like_count: PropTypes.number,
  caption: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      massage: PropTypes.string,
      creator: PropTypes.shape({
        profile_image: PropTypes.string,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired
};

export default FeedPhoto;
