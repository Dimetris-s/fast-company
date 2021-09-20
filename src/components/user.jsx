import React, { useEffect, useState } from "react";
import QualitiesList from "./qualitiesList";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import api from "../API/index";

const User = ({ id }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then(user => setUser(user));
    }, []);

    if (!user) return <h1>LOADING</h1>;

    return (
        <div className="ps-3">
            <h1 className="mb-3">{user.name}</h1>
            <h2 className="mb-3">Профессия: {user.profession.name}</h2>
            <div className="mb-3">
                <QualitiesList qualities={user.qualities} />
            </div>
            <div className="mb-3">
                completedMeetings: {user.completedMeetings}
            </div>
            <h2 className="mb-3">rate: {user.rate}</h2>
            <Link to="/users">
                <button className="btn btn-primary">Все пользователи</button>
            </Link>
        </div>
    );
};

User.propTypes = {
    id: PropTypes.string.isRequired
};

export default User;
