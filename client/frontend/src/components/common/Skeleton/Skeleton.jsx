import React from "react";
import "./Skeleton.css";

const Skeleton = ({
  type = "rectangular",
  width,
  height,
  className = "",
  style = {},
}) => {
  const classes = `skeleton skeleton-${type} ${className}`;
  
  const inlineStyles = {
    ...style,
    ...(width && { width }),
    ...(height && { height }),
  };

  return <div className={classes} style={inlineStyles}></div>;
};

export default Skeleton;
