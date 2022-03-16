import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const NavProfile = () => {
    const { currentUser } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => setShowMenu((prev) => !prev);

    return (
        <div className="dropdown">
            <div
                className="btn dropdown-toggle d-flex align-items-center"
                onClick={toggleMenu}
            >
                <div className="me-3">{currentUser.name}</div>
                <img
                    src={currentUser.image}
                    alt="avatar"
                    className="img img-responsive"
                    height="40"
                />
            </div>
            <div className={"dropdown-menu w-100" + (showMenu ? " show" : "")}>
                <Link
                    className="dropdown-item"
                    to={`/users/${currentUser._id}`}
                >
                    Profile
                </Link>
                <Link className="dropdown-item" to="/logout">
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
