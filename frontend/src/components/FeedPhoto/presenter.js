// 이 컴포넌트는 Feed 외에 다른 컴포넌트에도 재 사용 될 예정이기에 따로 생성 함

import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import PhotoActions from "components/PhotoActions";

const FeedPhoto = (props, context) => {
  console.log(props);
  return (
    <div className={styles.feedPhoto}>
      <header>
        <img
          src={props.creator.profile_image || require("images/noPhoto.jpg")}
          alt={props.creator.username}
        />
        <span>{props.creator.username}</span>
        <span>{props.location}</span>
      </header>
      <img src={props.file} alt={props.caption} />
      <div>
        <PhotoActions number={props.like_counter} />
      </div>
    </div>
  );
};

FeedPhoto.propTypes = {
  creator: PropTypes.shape({
    profile_image: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  location: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
  like_counter: PropTypes.number,
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
