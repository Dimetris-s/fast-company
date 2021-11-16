import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import API from "../../../API";
import EditForm from "../../UI/editForm";

const EditUserPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState();
    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, []);

    return (
        <div className="mt-5 container">
            <div className="p-4 shadow">
                {user ? <EditForm user={user} /> : "loading..."}
            </div>
        </div>
    );
};

export default EditUserPage;
