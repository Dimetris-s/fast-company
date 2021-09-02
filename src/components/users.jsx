import React, { useState } from "react";
import Pagination from "./pagination";
import User from "./user";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";

const Users = ({ users: allUsers, ...handlers }) => {
    const usersPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);

    const users = paginate(allUsers, currentPage, usersPerPage);

    const renderUsers = () => {
        return users.map((user) => {
            return <User key={user._id} {...handlers} {...user} />;
        });
    };
    const pageChangeHandler = (page) => {
        setCurrentPage(page);
    };
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Избранное</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{renderUsers()}</tbody>
            </table>
            <Pagination
                itemsCount={allUsers.length}
                itemsPerPage={usersPerPage}
                currentPage={currentPage}
                onPageChange={pageChangeHandler}
            />
        </>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Users;
