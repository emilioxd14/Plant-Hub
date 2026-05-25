import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HubView from './views/HubView';
import DetailView from './views/DetailView';
import LoginView from './views/LoginView';
import BillingView from './views/BillingView';
import StoreView from './views/StoreView';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginView />} />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <HubView />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/plant/:id" 
        element={
          <ProtectedRoute>
            <DetailView />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/store" 
        element={
          <ProtectedRoute>
            <StoreView />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/billing" 
        element={
          <ProtectedRoute>
            <BillingView />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default App;
