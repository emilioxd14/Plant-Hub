import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePlants } from '../context/PlantContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = usePlants();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
