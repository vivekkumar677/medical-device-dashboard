import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
};

const amcCmcSlice = createSlice({
    name: "amcCmc",
    initialState,
    reducers: {
        addContract: (state, action) => {
            state.list.push(action.payload);
        },
        deleteContracts: (state, action) => {
            state.list = state.list.filter(contract => contract.id !== action.payload);
        },
        updateContract: (state, action) => {
            state.list = action.payload;
        },
    },
});

export const { addContract, deleteContracts, updateContract } = amcCmcSlice.actions;
export default amcCmcSlice.reducer;