import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface Item {
    // Define the properties of an item
    name: string;
    userName: string;
    password: string;
}

// Define the type for the state
interface UserState {
    items: Item[];
    isUserLoggedIn: boolean;
    displayName: string
}

// Define the initial state
const initialState: UserState = {
    items: [],
    isUserLoggedIn: false,
    displayName: ""
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers : {
        addItem: (state, action: PayloadAction<Item>) => {
            state.items.push(action.payload);
        },
        addUserInfo: (state, action:PayloadAction<{displayName: string, isUserLoggedIn: boolean}>) => {
            state.displayName = action.payload.displayName
            state.isUserLoggedIn = action.payload.isUserLoggedIn
        },
        removeItem: (state) => {
            state.items.pop();
        }
    }
})

export const {addItem, addUserInfo,removeItem} = userSlice.actions;
export default userSlice.reducer;
