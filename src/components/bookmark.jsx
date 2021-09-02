import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ userId, bookmarked, onChange }) => {
    return (
        <i
            style={{ cursor: "pointer" }}
            className={`bi ${
                bookmarked ? "bi-bookmark-check-fill" : "bi-bookmark"
            }`}
            onClick={() => onChange(userId)}
        />
    );
};

BookMark.propTypes = {
    userId: PropTypes.number.isRequired,
    bookmarked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};

export default BookMark;
