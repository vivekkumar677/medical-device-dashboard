import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
};

const serviceLogsSlice = createSlice({
    name: 'serviceLogs',
    initialState,
    reducers: {
        addLog: (state, action) => {
            state.list.push(action.payload);
        },
        deleteLog: (state, action) => {
            state.list = state.list.filter(log => log.id !== action.payload);
        },
        setLog: (state, action) => {
            state.list = action.payload;
        },
        updateLog: (state, action) => {
            const index = state.list.findIndex(log => log.id === action.payload.id);
            if(index !== -1) {
                state.list[index] = action.payload;
            }
        }
    },
});

export const { addLog, deleteLog, setLog, updateLog } = serviceLogsSlice.actions;
export default serviceLogsSlice.reducer;