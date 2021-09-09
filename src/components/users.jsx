import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import User from "./user";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import api from "../API/index";

const Users = ({ users: allUsers, ...handlers }) => {
    const usersPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();

    useEffect(() => {
        api.professions
            .fetchAll()
            .then(professions => setProfessions(professions));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const filteredUsers = selectedProf
        ? allUsers.filter(user => user.profession._id === selectedProf._id)
        : allUsers;
    const count = filteredUsers.length;
    const usersCrop = paginate(filteredUsers, currentPage, usersPerPage);

    const renderUsers = () => {
        return usersCrop.map(user => {
            return <User key={user._id} {...handlers} {...user} />;
        });
    };
    const pageChangeHandler = page => {
        setCurrentPage(page);
    };
    const professionSelectHandler = item => {
        console.log(item);
        setSelectedProf(item);
    };

    const clearFilter = () => {
        setSelectedProf();
    };
    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column me-3 mt-3">
                    <GroupList
                        items={professions}
                        onItemChange={professionSelectHandler}
                        selectedItem={selectedProf}
                    />
                    <button
                        onClick={clearFilter}
                        className="btn btn-secondary mt-2"
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column align-items-center flex-grow-1">
                <div className="align-self-start">
                    <SearchStatus usersCount={count} />
                </div>
                {count > 0 && (
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
                )}

                <Pagination
                    itemsCount={count}
                    itemsPerPage={usersPerPage}
                    currentPage={currentPage}
                    onPageChange={pageChangeHandler}
                />
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Users;
