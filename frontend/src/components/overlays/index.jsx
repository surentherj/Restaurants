// IMPORT PACKAGES
import React from "react";

const SpinnerOverlay = (props) => {
  return (
    <div
      className={`loader-wrapper ${
        props.parent === "content" ? "full-content" : "full-page"
      }`}
    >
      <div className="rloader mb-four-s" />
      <h1 className={`${props.titleSize ? props.titleSize : ""}`}>{props.loadingText}</h1>
    </div>
  );
};

export default SpinnerOverlay;
