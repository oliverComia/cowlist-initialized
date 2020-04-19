import React from "react";

const CowList = ({ cow, setShowCow }) => {
  return <li onClick={(cow) => setShowCow(cow)}>{cow.name}</li>;
};

export default CowList;
