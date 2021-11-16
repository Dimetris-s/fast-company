import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import api from "../../../API/index";
import UserInfo from "../../UI/userInfo";
import CommentsList from "../../UI/comments/commentsList";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();
    const [comments, setComments] = useState();
    useEffect(() => {
        api.users.getById(id).then((user) => setUser(user));
        api.comments
            .fetchCommentsForUser(id)
            .then((comments) => setComments(comments));
    }, []);

    const history = useHistory();
    const editClickHandler = () => history.push("/users/" + id + "/edit");
    const handleCommentDelete = (id) => {
        api.comments.remove(id);
        const newComments = comments.filter((c) => c._id !== id);
        setComments(newComments);
    };
    if (!user) return <h1>LOADING</h1>;
    const handleAddComment = (data) => {
        api.comments.add(data).then((newComment) => {
            setComments((prevState) => [...prevState, newComment]);
        });
    };
    return (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <UserInfo onClick={editClickHandler} user={user} />
                </div>

                <div className="col-md-8">
                    <CommentsList
                        onCommentAdd={handleAddComment}
                        onDelete={handleCommentDelete}
                        comments={comments}
                        pageId={id}
                    />
                </div>
            </div>
        </div>
    );
};

UserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserPage;
