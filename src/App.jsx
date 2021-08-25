import React, { useState } from "react";
import Users from "./components/users";
import api from "./API";
import SearchStatus from "./components/searchStatus";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll().map(user => ({...user, bookmarked: false})))

  const handleDelete = (userId) => {
    const newUsers = users.filter((user) => user._id !== userId);
    setUsers(newUsers);
  };

  const bookmarkStatusChangeHandler = userId => {
    const newUsers = users.map(user => user._id === userId ? {...user, bookmarked: !user.bookmarked} : user)
    setUsers(newUsers)
  }

  return (
    <>
      <SearchStatus usersCount={users.length} />
      <Users users={users} onDelete={handleDelete} onChange={bookmarkStatusChangeHandler}/>
    </>
  );
};

export default App;
