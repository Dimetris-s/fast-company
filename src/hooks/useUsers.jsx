import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import usersService from "../services/users.service";
import { toast } from "react-toastify";

const UsersContext = React.createContext();

export const useUsers = () => {
    return useContext(UsersContext);
};

const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const errorCatcher = (error) => {
        const { message } = error.response.data;
        setError(message);
    };
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { content } = await usersService.fetchAll();
                setUsers(content);
                setLoading(false);
            } catch (error) {
                errorCatcher(error);
            }
        };
        getUsers();
    }, []);
    return (
        <UsersContext.Provider value={{ users, isLoading }}>
            {!isLoading ? children : "Loading..."}
        </UsersContext.Provider>
    );
};

UsersProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};

export default UsersProvider;
