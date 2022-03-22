import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/qaulity.service";

const initialState = {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
};

const qualitySlice = createSlice({
    name: "quality",
    initialState,
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesReceived: (state, action) => {
            state.lastFetch = Date.now();
            state.isLoading = false;
            state.entities = action.payload;
        },
        qualitiesRequestFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

const isOutdate = (date) => Date.now() - date > 10 * 60 * 1000;

const { actions, reducer: qualityReducer } = qualitySlice;
const { qualitiesReceived, qualitiesRequestFailed, qualitiesRequested } =
    actions;
export const loadQualities = () => async (dispatch, getState) => {
    const { lastFetch } = getState().quality;
    if (!isOutdate(lastFetch)) return;
    dispatch(qualitiesRequested());
    try {
        const { content } = await qualityService.fetchAll();
        dispatch(qualitiesReceived(content));
    } catch (error) {
        dispatch(qualitiesRequestFailed());
    }
};

export const getQualities = () => (state) => state.quality.entities;
export const getQualityLoadingStatus = () => (state) => state.quality.isLoading;
export const getQualitiesByIds = (qualIds) => (state) => {
    const result = [];
    for (const qualId of qualIds) {
        for (const qual of state.quality.entities) {
            if (qual._id === qualId) {
                result.push(qual);
                break;
            }
        }
    }
    return result;
};

export default qualityReducer;
