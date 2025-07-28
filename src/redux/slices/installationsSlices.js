import { createSlice } from '@reduxjs/toolkit';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/storage';

const STORAGE_KEY = 'installations';

const initialState = {
  list: loadFromLocalStorage(STORAGE_KEY) || []
};

const installationsSlice = createSlice({
  name: 'installations',
  initialState,
  reducers: {
    setInstallations(state, action) {
      state.list = action.payload;
      saveToLocalStorage(STORAGE_KEY, state.list);
    },
    addInstallation(state, action) {
      state.list.push(action.payload);
      saveToLocalStorage(STORAGE_KEY, state.list);
    },
    updateInstallation(state, action) {
      const index = state.list.findIndex(i => i.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
        saveToLocalStorage(STORAGE_KEY, state.list);
      }
    },
    deleteInstallation(state, action) {
      state.list = state.list.filter(i => i.id !== action.payload);
      saveToLocalStorage(STORAGE_KEY, state.list);
    }
  }
});

export const { setInstallations, addInstallation, updateInstallation, deleteInstallation } = installationsSlice.actions;
export default installationsSlice.reducer;