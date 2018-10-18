import React from "react";
import PropTypes from "prop-types";
import Loading from "components/Loading";
import styles from "./styles.scss";
import UserRow from "components/UserRow";

const Explore = props => {
  if (props.loading) {
    return (
      <div className={styles.explore}>
        <Loading />
      </div>
    );
  } else if (props.userList) {
    return <RenderExplore {...props} />;
  }
};

const RenderExplore = props => {
  return (
    <div className={styles.explore}>
      {props.userList.map(user => (
        <UserRow big={true} user={user} key={user.id} />
      ))}
    </div>
  );
};

Explore.propTypes = {
  loading: PropTypes.bool.isRequired,
  userList: PropTypes.array
};

export default Explore;
