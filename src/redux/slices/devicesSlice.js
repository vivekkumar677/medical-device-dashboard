
import { createSlice } from '@reduxjs/toolkit';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/storage';

const STORAGE_KEY = 'devices';

const initialState = {
  list: loadFromLocalStorage(STORAGE_KEY) || []
};

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setDevices(state, action) {
      state.list = action.payload;
      saveToLocalStorage(STORAGE_KEY, state.list);
    },
    addDevice(state, action) {
      state.list.push(action.payload);
      saveToLocalStorage(STORAGE_KEY, state.list);
    },
    updateDevice(state, action) {
      const index = state.list.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
        saveToLocalStorage(STORAGE_KEY, state.list);
      }
    },
    deleteDevice(state, action) {
      state.list = state.list.filter(d => d.id !== action.payload);
      saveToLocalStorage(STORAGE_KEY, state.list);
    }
  }
});

export const { setDevices, addDevice, updateDevice, deleteDevice } = devicesSlice.actions;
export default devicesSlice.reducer;