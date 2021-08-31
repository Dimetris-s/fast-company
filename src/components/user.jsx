import React from "react";
import Bookmark from "./bookmark";
import Quality from "./quality";

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  bookmarked,
  onDelete,
  onChange,
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((quality) => (
          <Quality key={quality._id} {...quality} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <Bookmark bookmarked={bookmarked} onChange={onChange} userId={_id} />
      </td>
      <td>
        <button
          onClick={() => onDelete(_id)}
          type="button"
          className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default User;
