import React, { memo } from "react";

type Props = {
  data: {
    firstNameLastName: string;
    jobTitle: string;
    emailAddress: string;
  };
};

const PersonInfo = memo(({ data }: Props) => {
  const { firstNameLastName, jobTitle, emailAddress } = data;

  return (
    <>
      <div className="firstNameLastName">{firstNameLastName}</div>
      <div className="jobTitle">{jobTitle}</div>
      <div className="emailAddress">{emailAddress}</div>
    </>
  );
});

export default PersonInfo;
