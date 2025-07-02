import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [],
};

const devicesSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {
        addDevice: (state, action) => {
            state.list.push(action.payload);
        },
        updateDevice: (state, action) => {
            const index = state.list.findIndex(device => device.id === action.payload.id);
            if(index !== -1) {
                state.list[index] = action.payload;
            }
        },
        deleteDevice: (state, action) => {
            state.list = state.list.filter(device => device.id !== action.payload);
        },
        setDevices: (state, action) => {
            state.list = action.payload;
        },
    },
});

export const { addDevice, updateDevice, deleteDevice, setDevices } = devicesSlice.actions;
export default devicesSlice.reducer;