import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ bookmark, onClick }) => {
    return (
        <i
            style={{ cursor: "pointer" }}
            className={`bi ${
                bookmark ? "bi-bookmark-check-fill" : "bi-bookmark"
            }`}
            onClick={onClick}
        />
    );
};

BookMark.propTypes = {
    bookmark: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

export default BookMark;
