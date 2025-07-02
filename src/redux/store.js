import { configureStore } from '@reduxjs/toolkit';
import devicesSlice from './slices/devicesSlice';
import installationsReducer from './slices/installationsSlices';
import serviceLogsReducer from './slices/serviceLogsSlice';
import amcCmcReducer from './slices/amcCmcSlice';
import alertReducer from './slices/alertsSlice';

const store = configureStore({
    reducer: {
        devices: devicesSlice,
        installations: installationsReducer,
        serviceLogs: serviceLogsReducer,
        amcCmc: amcCmcReducer,
        alerts: alertReducer,
    },
});

export default store;