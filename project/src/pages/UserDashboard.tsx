import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Theater, Movie } from '../types';
import { data } from '../data';
import { ArrowRightIcon, SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserDashboard: React.FC = () => {
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // In a real app, this would be an API call
    setTheaters(data.theaters);
    setFeaturedMovies(data.movies.slice(0, 6));
  }, []);

  const filteredTheaters = theaters.filter(theater => 
    theater.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    theater.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Cinema Hub</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Find the best theaters and movies in your area
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-md leading-5 bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
              placeholder="Search theaters by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Theaters</h2>
            <Link to="/movies" className="text-blue-500 flex items-center hover:text-blue-400 transition-colors">
              See all movies <ArrowRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          {filteredTheaters.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No theaters found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTheaters.map((theater) => (
                <div 
                  key={theater.id} 
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{theater.name}</h3>
                    <p className="text-gray-400 mb-4">{theater.location}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">
                        <span className="font-medium">{theater.screens.length}</span> Screens
                      </span>
                      <span className="text-gray-300">
                        <span className="font-medium">{theater.totalSeats}</span> Seats
                      </span>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-700">
                    <Link 
                      to="/movies" 
                      className="block text-center text-blue-500 font-medium hover:text-blue-400 transition-colors"
                    >
                      View Movies
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Featured Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMovies.map((movie) => (
              <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg group">
                <div className="relative overflow-hidden h-64">
                  <img 
                    src={movie.image} 
                    alt={movie.title} 
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-bold text-white">{movie.title}</h3>
                    <p className="text-gray-300 text-sm">{movie.duration} mins | {movie.genre.join(', ')}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{movie.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-gray-300 text-sm">
                      <span className="font-medium">From ₹{Math.min(...movie.showTimes.map(st => st.price))}</span>
                    </div>
                    <Link
                      to={`/movies`}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;