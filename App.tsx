import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { ProtectedRoute } from './components/ProtectedRoute'; // Kept for legacy reference
import RoleBasedRoute from './components/RoleBasedRoute';
import { Dashboard } from './components/Dashboard';
import { AdminDashboard } from './components/AdminDashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={
        <RoleBasedRoute allowedRoles={['user', 'admin']}>
          <Dashboard />
        </RoleBasedRoute>
      } />
      <Route path="/admin" element={
        <RoleBasedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </RoleBasedRoute>
      } />
      <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;