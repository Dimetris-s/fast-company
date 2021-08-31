import React, { useState } from "react";
import Users from "./components/users";
import api from "./API";
import SearchStatus from "./components/searchStatus";
import Pagination from "./components/pagination";

const App = () => {
  const [users, setUsers] = useState(
    api.users.fetchAll().map((user) => ({ ...user, bookmarked: false }))
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(4);

  const pages = new Array(Math.ceil(users.length / usersPerPage)).fill(0).map((_, index) => index)

  const handleDelete = (userId) => {
    const newUsers = users.filter((user) => user._id !== userId);
    setUsers(newUsers);
  };

  const bookmarkStatusChangeHandler = (userId) => {
    const newUsers = users.map((user) =>
      user._id === userId ? { ...user, bookmarked: !user.bookmarked } : user
    );
    setUsers(newUsers);
  };

  const togglePageHandler = (event, pageNumber) => {
    event.preventDefault()
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <SearchStatus usersCount={users.length} />
      {users.length > 0 && (
        <Users
          users={users}
          usersPerPage={usersPerPage}
          currentPage={currentPage}
          onDelete={handleDelete}
          onChange={bookmarkStatusChangeHandler}
        />
      )}
      <Pagination pages={pages} onToggle={togglePageHandler} currentPage={currentPage} />
    </>
  );
};

export default App;
