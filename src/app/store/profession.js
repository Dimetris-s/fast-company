import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";
const initialState = {
    entities: null,
    isLoading: true,
    error: null
};
const professionSlice = createSlice({
    name: "profession",
    initialState,
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionReceived: (state, action) => {
            state.isLoading = false;
            state.entities = action.payload;
        },
        professionRequestFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

const { actions, reducer: professionReducer } = professionSlice;
const { professionReceived, professionRequestFailed, professionsRequested } =
    actions;

export const loadProfessions = () => async (dispatch) => {
    dispatch(professionsRequested());
    try {
        const { content } = await professionService.get();
        dispatch(professionReceived(content));
    } catch (error) {
        dispatch(professionRequestFailed());
    }
};

export const getProfessions = () => (state) => state.profession.entities;
export const getProfessionLoadingStatus = () => (state) =>
    state.profession.isLoading;
export const getProfessionById = (profId) => (state) => {
    return state.profession.entities.find((el) => el._id === profId);
};

export default professionReducer;
