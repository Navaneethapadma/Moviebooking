import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Movies from './pages/Movies';
import Theaters from './pages/Theaters';
import NotFound from './pages/NotFound';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Navigate to="/login\" replace />} />
            <Route path="/login" element={<Login />} />
            
            {/* User Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <UserDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/movies" 
              element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <Movies />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/theaters" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Theaters />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;