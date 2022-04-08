import React from "react";

const FormatDate = ({ date }) => {
  if (date) {
    const d = new Date(date);
    return (
      <div style={{ marginTop: "15px" }}>
        <div>{`${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`}</div>
        <div>{`${d.getHours()}:${d.getMinutes()}`}</div>
      </div>
    );
  }
  return "";
};

export default FormatDate;
