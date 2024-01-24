import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthorized = sessionStorage.getItem('isDiscoveringDiagnosis') === 'true';
  const location = useLocation();

  if (isAuthorized) {
    // If authorized, render the Outlet which will render the child routes
    return <Outlet />;
  } else {
    // If not authorized and trying to access /results, prevent it
    if (location.pathname === '/results') {
      sessionStorage.removeItem('isDiscoveringDiagnosis');
      return <Navigate to="/" replace />;
    }
    // If the user is not navigating to /results, allow the navigation
    // This is to handle potential race conditions
    return null;
  }
};

export default PrivateRoute;