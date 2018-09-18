import React from "react";
import PropTypes from "prop-types";
import styles from "./styels.scss";

const PhotoComments = props => {
  return (
    <div>
      <ul>
        <Comment username={props.creator} comment={props.caption} />
        {props.comments.map(comment => (
          <Comment
            username={comment.creator.username}
            comment={comment.message}
            key={comment.id}
          />
        ))}
      </ul>
    </div>
  );
};

const Comment = props => {
  return (
    <div>
      <span>{props.username}</span>
      <span>{props.comment}</span>
    </div>
  );
};

PhotoComments.propTypes = {
  creator: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string,
      creator: PropTypes.shape({
        profile_image: PropTypes.string,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired
};

export default PhotoComments;
