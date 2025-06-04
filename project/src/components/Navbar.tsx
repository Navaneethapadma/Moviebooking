import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FilmIcon, LogOutIcon, UserIcon, MenuIcon, XIcon } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center">
              <FilmIcon className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold">Cinema Hub</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user?.role === 'admin' ? (
              <>
                <Link to="/admin\" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                  Dashboard
                </Link>
                <Link to="/admin/theaters" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                  Theaters
                </Link>
                <Link to="/movies" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                  Movies
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                  Dashboard
                </Link>
                <Link to="/movies" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                  Movies
                </Link>
              </>
            )}
            
            <div className="flex items-center ml-4">
              <span className="text-gray-300 mr-2 flex items-center">
                <UserIcon className="h-4 w-4 mr-1" />
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white p-1 rounded-full"
                aria-label="Logout"
              >
                <LogOutIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 pb-3 px-4">
          <div className="flex flex-col space-y-2">
            {user?.role === 'admin' ? (
              <>
                <Link to="/admin\" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                  Dashboard
                </Link>
                <Link to="/admin/theaters" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                  Theaters
                </Link>
                <Link to="/movies" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                  Movies
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                  Dashboard
                </Link>
                <Link to="/movies" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                  Movies
                </Link>
              </>
            )}
            
            <div className="flex items-center justify-between border-t border-gray-700 pt-3 mt-3">
              <span className="text-gray-300 flex items-center">
                <UserIcon className="h-4 w-4 mr-1" />
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white p-1 rounded-full"
                aria-label="Logout"
              >
                <LogOutIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;