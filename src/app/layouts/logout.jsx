import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Logout = () => {
    const { push } = useHistory();
    const { logOut } = useAuth();
    useEffect(() => {
        logOut();
        push("/");
    }, []);
    return <div>loading</div>;
};

export default Logout;
