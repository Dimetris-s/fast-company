import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Comment from "./comment";
import SelectField from "../../common/form/selectField";
import API from "../../../API";
import { validator } from "../../../utils/validator";
import TextAreaField from "../../common/form/textAreaField";

const CommentsList = ({ comments, onDelete, onCommentAdd, pageId }) => {
    const [data, setData] = useState({ userId: "", message: "" });
    const [errors, setErrors] = useState({});
    const [users, setUsers] = useState();
    const config = {
        userId: {
            isRequired: {
                message: "Необходимо выбрать пользователя"
            }
        },
        message: {
            isRequired: {
                message: "Комментарий не может быть пустым"
            }
        }
    };
    useEffect(() => {
        API.users.fetchAll().then(data => setUsers(data));
    }, []);
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, config);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleChange = ({ name, value }) => {
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const addCommentHandler = () => {
        const isValid = validate();
        if (!isValid) return;
        const commentData = {
            pageId,
            userId: data.userId,
            content: data.message
        };
        onCommentAdd(commentData);
        setData({ userId: "", message: "" });
    };
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <div className="d-flex flex-column">
                        <h2>New comment</h2>
                        <SelectField
                            name="userId"
                            defaultOption="Выберите пользователя"
                            onChange={handleChange}
                            value={data.userId}
                            options={users}
                            error={errors.userId}
                        />
                        <TextAreaField
                            name="message"
                            label="Сообщение"
                            value={data.message}
                            onChange={handleChange}
                            error={errors.message}
                            rows={3}
                        />
                        <button
                            onClick={addCommentHandler}
                            className="btn btn-primary align-self-end"
                        >
                            Опубликовать
                        </button>
                    </div>
                </div>
            </div>
            {comments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        {comments.map(comment => (
                            <Comment
                                key={comment._id}
                                onDelete={onDelete}
                                comment={comment}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

CommentsList.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object),
    onDelete: PropTypes.func,
    pageId: PropTypes.string,
    onCommentAdd: PropTypes.func
};

export default CommentsList;
