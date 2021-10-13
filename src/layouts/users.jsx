import React from "react";
import { useParams } from "react-router";
import User from "../components/userPage";
import UsersList from "../components/usersList";

const Users = () => {
    const params = useParams();
    const userId = params.userId;
    return <>{userId ? <User id={userId} /> : <UsersList />}</>;
};

export default Users;
