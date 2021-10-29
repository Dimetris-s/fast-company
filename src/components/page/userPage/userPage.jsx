import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Qualities from "../../UI/qualities";
import { useHistory } from "react-router-dom";
import api from "../../../API/index";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then(user => setUser(user));
    }, []);
    const history = useHistory();
    const clickHandler = () => {
        history.push("/users/" + id + "/edit");
    };
    if (!user) return <h1>LOADING</h1>;

    return (
        <div className="ps-3">
            <h1 className="mb-3">{user.name}</h1>
            <h2 className="mb-3">Профессия: {user.profession.name}</h2>
            <div className="mb-3">
                <Qualities qualities={user.qualities} />
            </div>
            <div className="mb-3">
                completedMeetings: {user.completedMeetings}
            </div>
            <h2 className="mb-3">rate: {user.rate}</h2>
            <button onClick={clickHandler} className="btn btn-primary">
                Изменить
            </button>
        </div>
    );
};

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserPage;
