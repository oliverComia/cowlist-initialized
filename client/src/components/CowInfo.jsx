import React from "react";

const CowInfo = ({ cowDetails }) => {
  return (
    <div>
      <h1>Cow's Name: {cowDetails.name}</h1>
      <h1>Cow's Description: {cowDetails.description}</h1>
    </div>
  );
};

export default CowInfo;
