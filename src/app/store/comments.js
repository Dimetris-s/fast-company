import { createAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";
import localStorageService from "../services/localStorage.service";

const initialState = {
    entities: null,
    error: null,
    isLoading: true
};

const commentsSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsRequestFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        commentsReceived: (state, action) => {
            state.isLoading = false;
            state.entities = action.payload;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentCreateRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        commentRemoveRequestFailed: (state, action) => {
            state.error = action.payload;
        },

        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload.id
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsReceived,
    commentCreated,
    commentCreateRequestFailed,
    commentsRequestFailed,
    commentRemoveRequestFailed,
    commentsRequested,
    commentRemoved
} = actions;

// Acitons
const commentsCreateRequested = createAction(
    "comments/commentsCreateRequested"
);
const commentsRemoveRequested = createAction(
    "comments/commentsRemoveRequested"
);

export const removeComment = (id) => async (dispatch) => {
    dispatch(commentsRemoveRequested());
    try {
        const { content } = await commentService.removeComment(id);
        if (content === null) {
            dispatch(commentRemoved({ id }));
        }
    } catch (error) {
        dispatch(commentRemoveRequestFailed(error.message));
    }
};

export const createComment =
    ({ data, pageId }) =>
    async (dispatch) => {
        dispatch(commentsCreateRequested());
        const comment = {
            ...data,
            _id: nanoid(),
            pageId,
            userId: localStorageService.getUserId(),
            created_at: Date.now()
        };
        try {
            const { content } = await commentService.createComment(comment);
            dispatch(commentCreated(content));
        } catch (error) {
            dispatch(commentCreateRequestFailed(error.message));
        }
    };

export const loadComments = (id) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(id);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};
// Selectors
export const getComments = () => (state) => state.comments.entities;
//
export default commentsReducer;
