import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './consts/theme';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/HomePage';
import TryNow from './pages/TryNowPage';
import DiagnosisPage from './pages/DiagnosisPage';
// import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trynow" element={<TryNow />} />          
          <Route path="/results" element={<DiagnosisPage />} />
          {/* <Route element={<PrivateRoute />}>
            <Route path="/results" element={<DiagnosisPage />} />
          </Route> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;