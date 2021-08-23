import React, { useState } from 'react';
import api from '../API'
import User from './user'

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = userId => {
        const newUsers = users.filter(user => user._id !== userId)
        setUsers(newUsers)
    }

    const renderPhrase = number => {
        switch (true) {
            case number === 0: return "Никто с тобой не тусанет"
            case number > 1 && number < 5: return `${number} человека тусанут с тобой сегодня`
            default: return `${number} человек тусанет с тобой сегодня`
        }
    }

    
    return ( 
        <>
            <h2 className={`fs-3 mt-1 ms-1 badge bg-${users.length ? "primary" : "danger"}`}>{renderPhrase(users.length)}</h2>
            {
                users.length > 0 && 
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col" colSpan="2">Оценка</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => {
                                return (
                                    <User 
                                        key={user._id}
                                        id={user._id} 
                                        name={user.name} 
                                        profession={user.profession} 
                                        qualities={user.qualities} 
                                        rate={user.rate} 
                                        completedMeetings={user.completedMeetings}
                                        deleteClickHandler={handleDelete} 
                                />
                                )
                            })
                        }
                        
                    </tbody>
                </table>
            }
        </>
     );
}
 
export default Users;