import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
};

const installationsSlice = createSlice({
    name: "installations",
    initialState,
    reducers: {
        addInstallation: (state, action) => {
            state.list.push(action.payload);
        },
        setInstallations: (state, action) => {
            state.list = action.payload;
        },
    },
});

export const { addInstallation, setInstallations } = installationsSlice.actions;
export default installationsSlice.reducer;