import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
};

const alertsSlice = createSlice({
    name: "alerts",
    initialState,
    reducers: {
        addAlert: (state, action) => {
            state.list.push(action.payload);
        },
        deleteAlert: (state, action) => {
            state.list = state.list.filter(alert => alert.id !== action.payload);
        },
    },
});

export const { addAlert, deleteAlert } = alertsSlice.actions;
export default alertsSlice.reducer;