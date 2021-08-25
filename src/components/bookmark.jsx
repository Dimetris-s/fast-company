import React from "react";

const BookMark = ({userId, bookmarked, onChange }) => {
  return (
    <i
      style={{ cursor: "pointer" }}
      className={`bi ${bookmarked ? "bi-bookmark-check-fill" : "bi-bookmark"}`}
      onClick={() => onChange(userId)}
    />
  );
};

export default BookMark;
