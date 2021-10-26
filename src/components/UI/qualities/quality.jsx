import React from "react";
import PropTypes from "prop-types";

const Quality = ({ _id, name, color }) => {
    return (
        <span key={_id} className={`me-2 badge bg-${color}`}>
            {name}
        </span>
    );
};

Quality.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export default Quality;
