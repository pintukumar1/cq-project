import React from "react";

export default ({ message }) => {
  return (
    <div
      style={{
        padding: "18px 15px",
        borderRadius: "8px",
        backgroundColor: "#d32f2f",
        margin: "15px 0",
        fontSize: "17px",
        color: "#fff"
      }}
    >
      {message}
    </div>
  );
};
