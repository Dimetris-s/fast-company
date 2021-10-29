import React from "react";
import { useParams } from "react-router";
import UserPage from "../components/page/userPage/userPage";
import UsersListPage from "../components/page/usersListPage/usersListPage";
const Users = () => {
    const { userId } = useParams();

    return <>{userId ? <UserPage id={userId} /> : <UsersListPage />}</>;
};

export default Users;
