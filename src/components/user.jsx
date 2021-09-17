import React from "react";
import Bookmark from "./bookmark";
import Quality from "./quality";
import PropTypes from "prop-types";

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    bookmarked,
    onDelete,
    onToggleBookmark
}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>
                {qualities.map(quality => (
                    <Quality key={quality._id} {...quality} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <td>
                <Bookmark
                    bookmarked={bookmarked}
                    onClick={() => onToggleBookmark(_id)}
                />
            </td>
            <td>
                <button
                    onClick={() => onDelete(_id)}
                    type="button"
                    className="btn btn-danger"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmarked: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookmark: PropTypes.func.isRequired
};

export default User;
