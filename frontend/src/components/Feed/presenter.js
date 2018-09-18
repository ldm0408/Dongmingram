import React from "react";
import PropTypes from "prop-types";
import Loading from "components/Loading";
import styles from "./styles.scss";
import FeedPhoto from "../FeedPhoto/presenter";

const Feed = (props, context) => {
  if (props.loading) {
    return (
      <div className={styles.feed}>
        <Loading />
      </div>
    );
  } else if (props.feed) {
    return <RenderFeed {...props} />;
  }
};

const RenderFeed = props => {
  return (
    <div className={styles.feed}>
      {props.feed.map(photo => (
        <FeedPhoto {...photo} key={photo.id} />
      ))}
    </div>
  );
};

Feed.propTypes = {
  loading: PropTypes.bool.isRequired,
  feed: PropTypes.array
};

export default Feed;