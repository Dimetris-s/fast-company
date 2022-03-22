import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getLoadStatus, loadUsers } from "../../../store/user";
const UserLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isUsersLoaded = useSelector(getLoadStatus());
    useEffect(() => {
        if (!isUsersLoaded) {
            dispatch(loadUsers());
        }
    }, []);
    if (!isUsersLoaded) return <h1>Loading...</h1>;

    return children;
};

UserLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};

export default UserLoader;
