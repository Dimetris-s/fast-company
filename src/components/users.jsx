import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import api from "../API/index";
import UsersTable from "./usersTable";
import _ from "lodash";
import { useParams } from "react-router";

const Users = () => {
    const usersPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState();
    const {userId} = useParams()

    useEffect(async () => {
        const users = await api.users.fetchAll();
        setUsers(users);
    }, []);

    useEffect(() => {
        api.professions
            .fetchAll()
            .then(professions => setProfessions(professions));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleDelete = userId => {
        const newUsers = users.filter(user => user._id !== userId);
        setUsers(newUsers);
    };

    const bookmarkStatusChangeHandler = userId => {
        const newUsers = users.map(user =>
            user._id === userId
                ? { ...user, bookmarked: !user.bookmarked }
                : user
        );
        setUsers(newUsers);
    };

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

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(
                  user =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users;
        const sortedUsers = sortBy
            ? _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
            : filteredUsers;
        const count = sortedUsers.length;
        const usersCrop = paginate(sortedUsers, currentPage, usersPerPage);

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
                            onDelete={handleDelete}
                            onToggleBookmark={bookmarkStatusChangeHandler}
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
    }
    return "Loading...";
};

export default Users;
