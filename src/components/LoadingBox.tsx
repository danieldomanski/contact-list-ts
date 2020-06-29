import React, { ReactElement } from "react";

import ReactLogo from "../logo.svg";

function LoadingBox(): ReactElement {
  return (
    <div className="box box--loading">
      <h2>Loading...</h2>
      <img
        src={ReactLogo}
        alt="loading indicator"
        className="spinner spinner--sm"
      />
    </div>
  );
}

export default LoadingBox;
