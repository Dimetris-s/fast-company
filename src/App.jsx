import React, { useEffect, useState } from "react";
import Users from "./components/users";
import api from "./API";

const App = () => {
    const [users, setUsers] = useState();

    useEffect(async () => {
        const users = await api.users.fetchAll();
        setUsers(users);
    }, []);

    const handleDelete = userId => {
        const newUsers = users.filter(user => user._id !== userId);
        setUsers(newUsers);
    };

    const bookmarkStatusChangeHandler = userId => {
        const newUsers = users.map(user =>
            user._id === userId
                ? { ...user, bookmarked: !user.bookmarked }
                : user
        );
        setUsers(newUsers);
    };

    return (
        <>
            {users && (
                <Users
                    users={users}
                    onDelete={handleDelete}
                    onToggleBookmark={bookmarkStatusChangeHandler}
                />
            )}
        </>
    );
};

export default App;
