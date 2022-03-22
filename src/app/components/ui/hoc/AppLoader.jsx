import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    getIsLoggedIn,
    getLoadingStatus,
    loadUsers
} from "../../../store/user";
import { loadQualities } from "../../../store/quality";
import { loadProfessions } from "../../../store/profession";
const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const isLoadingStatus = useSelector(getLoadingStatus());
    useEffect(() => {
        dispatch(loadQualities());
        dispatch(loadProfessions());
        if (isLoggedIn) {
            dispatch(loadUsers());
        }
    }, [dispatch, isLoggedIn]);
    console.log(isLoadingStatus);
    if (isLoadingStatus) return <h1>Loading.....</h1>;

    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};

export default AppLoader;
