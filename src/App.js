import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import store from './redux/store';
import Dashboard from './pages/Dashboard';
import Installation from './pages/Installation';
import ServiceLogs from './pages/ServiceLogs';
import AMCTracker from './pages/AMCTracker';
import Alerts from './pages/Alerts';
import ThemeContextProvider from './context/ThemeContext';
import AuthProvider from './context/AuthContext';
import Layout from './components/Layout';

function App() {

  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeContextProvider>
          <CssBaseline />
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/installation" element={<Installation />} />
                <Route path="/service-logs" element={<ServiceLogs />} />
                <Route path="/amc-tracker" element={<AMCTracker />} />
                <Route path="/alerts" element={<Alerts />} />
              </Routes>
            </Layout>
          </Router>
        </ThemeContextProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
