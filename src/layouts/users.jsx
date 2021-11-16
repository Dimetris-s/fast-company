import React from "react";
import { useParams } from "react-router";
import UserPage from "../components/page/userPage/userPage";
import UsersListPage from "../components/page/usersListPage/usersListPage";
import UsersProvider from "../hooks/useUsers";
const Users = () => {
    const { userId } = useParams();

    return (
        <UsersProvider>
            {userId ? <UserPage id={userId} /> : <UsersListPage />}
        </UsersProvider>
    );
};

export default Users;
