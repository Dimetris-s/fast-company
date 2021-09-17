import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import api from "../API/index";
import UsersTable from "./usersTable";
import _ from "lodash";

const Users = ({ users: allUsers, ...handlers }) => {
    const usersPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

    useEffect(() => {
        api.professions
            .fetchAll()
            .then(professions => setProfessions(professions));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const filteredUsers = selectedProf
        ? allUsers.filter(
              user =>
                  JSON.stringify(user.profession) ===
                  JSON.stringify(selectedProf)
          )
        : allUsers;
    const sortedUsers = sortBy
        ? _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
        : filteredUsers;
    const count = sortedUsers.length;
    const usersCrop = paginate(sortedUsers, currentPage, usersPerPage);
    const pageChangeHandler = page => {
        setCurrentPage(page);
    };
    const professionSelectHandler = item => {
        setSelectedProf(item);
    };

    const clearFilter = () => {
        setSelectedProf();
    };
    const sortHandler = item => {
        setSortBy(item);
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
                    <UsersTable
                        users={usersCrop}
                        onSort={sortHandler}
                        selectedSort={sortBy}
                        {...handlers}
                    />
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
    onDelete: PropTypes.func.isRequired
};

export default Users;
