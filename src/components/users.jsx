import React from "react";
import User from "./user";

const Users = ({ users, currentPage, usersPerPage, ...handlers }) => {
  const renderUsers = () => {
    const currentUsers = users.slice(currentPage * usersPerPage, currentPage * usersPerPage + usersPerPage)
    return currentUsers.map((user) => {
      return <User key={user._id} {...handlers} {...user} />;
    })
  }
  return (
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
      <tbody>
        {renderUsers()}
      </tbody>
    </table>
  );
};

export default Users;
