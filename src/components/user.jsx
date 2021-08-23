import React from 'react';

const User = ({id, name, qualities, profession, completedMeetings, rate, deleteClickHandler}) => {
    return ( 
        <tr>
            <td>{name}</td>
            <td>
                {qualities.map(({_id, name, color}) => <span key={_id} className={`me-2 badge bg-${color}`}>{name}</span>)}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <td>
                <button onClick={() => deleteClickHandler(id)} type="button" className="btn btn-danger">Delete</button>
            </td>
        </tr>
     );
}
 
export default User;