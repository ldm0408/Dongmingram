import React from "react";
import App from "./presenter";

const Container = props => {
  console.log(props);
  return <App {...props} />;
};

export default Container;
