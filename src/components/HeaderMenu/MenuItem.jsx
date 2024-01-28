import React from "react";

function MenuItem(props) {
  return <div {...props}>{props.children}</div>;
}

export default MenuItem;
