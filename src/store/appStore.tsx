import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'

const appStore = configureStore({
    reducer: {
        user: userReducer
    }
});

export default appStore;
export type Dispatch = typeof appStore.dispatch;