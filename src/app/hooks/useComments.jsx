import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import commentService from "../services/comment.service";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { nanoid } from "nanoid";

const Context = createContext();

export const useComments = () => {
    return useContext(Context);
};

const CommentsProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [comments, setComments] = useState();
    const [error, setError] = useState(null);
    const { userId } = useParams();
    const { currentUser } = useAuth();
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    useEffect(() => {
        getComments();
    }, [userId]);
    async function getComments() {
        try {
            const { content } = await commentService.get(userId);
            setComments(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    async function deleteComment(id) {
        try {
            await commentService.delete(id);
            setComments((prev) => prev.filter((c) => c._id !== id));
        } catch (error) {
            errorCatcher(error);
        }
    }
    async function createComment(data) {
        const comment = {
            ...data,
            pageId: userId,
            userId: currentUser._id,
            _id: nanoid(),
            created_at: Date.now()
        };
        try {
            const { content } = await commentService.create(comment);
            setComments((prev) => [...prev, content]);
        } catch (error) {
            errorCatcher(error);
        }
    }
    return (
        <Context.Provider
            value={{ comments, isLoading, createComment, deleteComment }}
        >
            {children}
        </Context.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default CommentsProvider;
