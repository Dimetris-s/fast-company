import React from "react";
import PropTypes from "prop-types";
import BookMark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookmark,
    onDelete
}) => {
    const columns = {
        name: { name: "Имя", path: "name" },
        qualities: {
            name: "Качества",
            component: user => <QualitiesList qualities={user.qualities} />
        },
        profession: { name: "Профессия", path: "profession.name" },
        completedMeetings: {
            name: "Встретился, раз",
            path: "completedMeetings"
        },
        rate: { name: "Оценка", path: "rate" },
        bookmark: {
            name: "Избранное",
            path: "bookmarked",
            component: user => (
                <BookMark
                    bookmarked={user.bookmarked}
                    onClick={() => onToggleBookmark(user._id)}
                />
            )
        },
        delete: {
            component: user => (
                <button
                    onClick={() => onDelete(user._id)}
                    type="button"
                    className="btn btn-danger"
                >
                    Delete
                </button>
            )
        }
    };

    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UsersTable;
