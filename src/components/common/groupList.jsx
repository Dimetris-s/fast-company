import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProp,
    contentProp,
    selectedItem,
    onItemChange
}) => {
    return (
        <ul className="list-group">
            {Object.keys(items).map(key => (
                <li
                    key={items[key][valueProp]}
                    className={`list-group-item ${
                        selectedItem === items[key] ? "active" : ""
                    }`}
                    onClick={() => onItemChange(items[key])}
                    role="button"
                >
                    {items[key][contentProp]}
                </li>
            ))}
        </ul>
    );
};
GroupList.defaultProps = {
    valueProp: "_id",
    contentProp: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    valueProp: PropTypes.string,
    contentProp: PropTypes.string,
    onItemChange: PropTypes.func.isRequired,
    selectedItem: PropTypes.object
};

export default GroupList;
