import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FilmIcon } from 'lucide-react';

const NotFound: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4 text-center">
      <FilmIcon className="h-16 w-16 text-blue-500 mb-6" />
      <h1 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h1>
      <p className="text-gray-400 text-lg mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to={user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/login'}
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Return to {user ? (user.role === 'admin' ? 'Admin Dashboard' : 'Dashboard') : 'Login'}
      </Link>
    </div>
  );
};

export default NotFound;