import React from "react";

type Props = {
  data: {
    firstNameLastName: string;
    jobTitle: string;
    emailAddress: string;
  };
};

function PersonInfo(props: Props) {
  const { data } = props;
  return (
    <>
      <div className="firstNameLastName">{data.firstNameLastName}</div>
      <div className="jobTitle">{data.jobTitle}</div>
      <div className="emailAddress">{data.emailAddress}</div>
    </>
  );
}

export default PersonInfo;
