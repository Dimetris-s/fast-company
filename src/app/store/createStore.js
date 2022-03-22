import { combineReducers, configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./comments";
import professionReducer from "./profession";
import qualityReducer from "./quality";
import userReducer from "./user";

const rootReducer = combineReducers({
    quality: qualityReducer,
    profession: professionReducer,
    users: userReducer,
    comments: commentsReducer
});

export function cretateStore() {
    return configureStore({
        reducer: rootReducer
    });
}
