import React, { ReactElement } from "react";

function ErrorBox(): ReactElement {
  return (
    <div className="box box--error">
      <h2 className="box__heading">Error</h2>
      <p className="box__paragraph">
        There was an issue with loading resource.
      </p>
    </div>
  );
}

export default ErrorBox;
