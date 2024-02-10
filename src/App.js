import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './consts/theme';
import Home from './pages/HomePage';
import TryNow from './pages/TryNowPage';
import DiagnosisPage from './pages/DiagnosisPage';
import Layout from './components/Layout';
import ContactForm from './pages/ContactPage'; 
import Results from './pages/ResultsPage';
import UserManualPage from './pages/UserManualPage';
import Usability from './pages/UsabilityPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/results" element={<Layout><Results /></Layout>}/>
          <Route path="/usability" element={<Layout><Usability /></Layout>}/>
          <Route path="/manual" element={<Layout><UserManualPage /></Layout>}/>
          <Route path="/trynow" element={<Layout><TryNow /></Layout>} />
          <Route path="/contactus" element={<Layout><ContactForm /></Layout>}/>
          <Route path="/diagnosis" element={<Layout><DiagnosisPage /></Layout>} />          
          {/* <Route element={<PrivateRoute />}>
            <Route path="/results" element={<DiagnosisPage />} />
          </Route> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;