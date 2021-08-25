import React from "react";

const Quality = ({ _id, name, color }) => {
  return (
    <span key={_id} className={`me-2 badge bg-${color}`}>
      {name}
    </span>
  );
};

export default Quality;
