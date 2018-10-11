import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import PhotoActions from "components/PhotoActions";
import PhotoComments from "components/PhotoComments";
import TimeStamp from "components/TimeStamp";
import CommentBox from "components/CommentBox/";
import UserList from "components/UserList";

const FeedPhoto = (props, context) => {
  console.log(props);
  return (
    <div className={styles.feedPhoto}>
      <header className={styles.header}>
        <img
          src={props.creator.profile_image || require("images/noPhoto.jpg")}
          alt={props.creator.username}
          className={styles.image}
        />
        <div className={styles.headerColumn}>
          <span className={styles.creator}>{props.creator.username}</span>
          <span className={styles.location}>{props.location}</span>
        </div>
      </header>
      <img src={props.file} alt={props.caption} />
      <div className={styles.meta}>
        <PhotoActions
          number={props.like_counter}
          is_liked={props.is_liked}
          photoId={props.id}
          openLikes={props.openLikes}
        />
        <PhotoComments
          caption={props.caption}
          creator={props.creator.username}
          comments={props.comments}
        />
        <TimeStamp time={props.natural_time} />
        <CommentBox photoId={props.id} />
      </div>
      {props.seeingLikes && (
        <UserList title={context.t("Likes")} closeLikes={props.closeLikes} />
      )}
    </div>
  );
};

FeedPhoto.contextTypes = {
  t: PropTypes.func.isRequired
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
      message: PropTypes.string,
      creator: PropTypes.shape({
        profile_image: PropTypes.string,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  natural_time: PropTypes.string.isRequired,
  is_liked: PropTypes.bool.isRequired,
  seeingLikes: PropTypes.bool.isRequired,
  openLikes: PropTypes.func.isRequired,
  closeLikes: PropTypes.func.isRequired
};

export default FeedPhoto;
