import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ bookmarked, onClick }) => {
    return (
        <i
            style={{ cursor: "pointer" }}
            className={`bi ${
                bookmarked ? "bi-bookmark-check-fill" : "bi-bookmark"
            }`}
            onClick={onClick}
        />
    );
};

BookMark.propTypes = {
    bookmarked: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

export default BookMark;
