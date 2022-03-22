import { createSlice, createAction } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import { generateAuthError } from "../utils/generateAuthError";
import history from "../utils/history";
import { randomInt } from "../utils/randomInt";
import { randomAvatar } from "./randomAvatar";

const hasToken = localStorageService.getUserId() || null;

const initialState = {
    entities: null,
    isLoading: false,
    error: null,
    isLoggedIn: !!hasToken,
    auth: hasToken ? { userId: hasToken } : null,
    dataLoaded: false
};

const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.isLoading = false;
            state.entities = action.payload;
            state.dataLoaded = true;
        },
        usersRequestFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        authRequsetSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.auth = action.payload;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        authLoggedOut: (state) => {
            state.isLoggedIn = false;
            state.auth = null;
        },
        updateUserSuccess: (state, action) => {
            state.entities = state.entities.map((user) =>
                user._id === action.payload._id ? action.payload : user
            );
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const { actions, reducer: userReducer } = usersSlice;
const {
    usersReceived,
    usersRequestFailed,
    usersRequested,
    authRequestFailed,
    authRequsetSuccess,
    userCreated,
    authLoggedOut,
    updateUserSuccess,
    authRequested
} = actions;

const createUserRequested = createAction("user/createUserRequested");
const createUserRequestFailed = createAction("user/createUserRequestFailed");
const updateUserRequested = createAction("user/updateUserRequested");
const updateUserRequestFailed = createAction("user/updateUserRequestFailed");

const createUser = (data) => async (dispatch) => {
    dispatch(createUserRequested());
    try {
        const { content } = await userService.create(data);
        dispatch(userCreated(content));
    } catch (error) {
        dispatch(createUserRequestFailed(error.message));
    }
};

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(authLoggedOut());
    history.push("/");
};

export const loadUsers = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceived(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const signUp = ({ email, password, ...rest }) => {
    return async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequsetSuccess({ userId: data.localId }));
            const newUser = {
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                image: randomAvatar(),
                ...rest
            };
            dispatch(createUser(newUser));
            history.push("/users");
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };
};

export const updateUserData = (payload) => async (dispatch) => {
    dispatch(updateUserRequested());
    try {
        const { content } = await userService.update(payload);
        dispatch(updateUserSuccess(content));
        history.push(`/users/${content._id}`);
    } catch (error) {
        dispatch(updateUserRequestFailed());
    }
};

export const signIn =
    ({ payload, redirect }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const { email, password } = payload;
            const data = await authService.login({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequsetSuccess({ userId: data.localId }));
            if (redirect) history.push(redirect);
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                dispatch(authRequestFailed(errorMessage));
            } else {
                dispatch(authRequestFailed(error.message));
            }
        }
    };

// Selectors
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getCurrentUserData = () => (state) =>
    state.users.entities
        ? state.users.entities.find((u) => u._id === state.users.auth.userId)
        : null;
export const getLoadStatus = () => (state) => state.users.dataLoaded;
export const getUsersList = () => (state) => state.users.entities;
export const getUserById = (userId) => (state) =>
    state.users.entities.find((u) => u._id === userId);
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getLoadingStatus = () => (state) => state.users.isLoading;
export const getAuthError = () => (state) => state.users.error;

export default userReducer;
