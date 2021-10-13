import React, { useState, useEffect } from "react";
import Pagination from "../components/pagination";
import { paginate } from "../utils/paginate";
import GroupList from "../components/groupList";
import SearchStatus from "../components/searchStatus";
import TextField from "./textField";
import api from "../API/index";
import UsersTable from "../components/usersTable";
import _ from "lodash";

const Users = () => {
    const usersPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState();
    const [searchValue, setSearchValue] = useState("");

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

    const handleSearch = e => {
        clearFilter();
        setSearchValue(e.target.value);
    };
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
        setSearchValue("");
        setSelectedProf(item);
    };

    const clearFilter = () => {
        setSelectedProf();
    };
    const sortHandler = item => {
        setSortBy(item);
    };

    if (users) {
        const searchedUsers = searchValue
            ? users.filter(user => user.name.toLowerCase().match(searchValue))
            : users;
        const filteredUsers = selectedProf
            ? searchedUsers.filter(
                  user =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : searchedUsers;
        const sortedUsers = sortBy
            ? _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
            : filteredUsers;
        const count = sortedUsers.length;
        const usersCrop = paginate(sortedUsers, currentPage, usersPerPage);

        return (
            <div className="d-flex ps-2 pe-2">
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
                <div className="d-flex flex-column flex-grow-1">
                    <div className="align-self-start">
                        <SearchStatus usersCount={count} />
                    </div>
                    <TextField
                        value={searchValue}
                        onChange={handleSearch}
                        name="search"
                        placeholder="Search..."
                    />
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
