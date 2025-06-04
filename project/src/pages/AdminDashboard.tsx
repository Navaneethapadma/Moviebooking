import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { data } from '../data';
import { User, Movie, Theater, ShowTime } from '../types';
import { UsersIcon, FilmIcon, TheaterIcon, CalendarIcon, TrendingUpIcon as TrendUpIcon, DollarSignIcon, TicketIcon, SettingsIcon, PlusIcon, EditIcon, TrashIcon } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>('movies');
  const [isAddingMovie, setIsAddingMovie] = useState(false);
  const [isEditingMovie, setIsEditingMovie] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    setMovies(data.movies);
    setTheaters(data.theaters);
  }, []);

  const toggleAddMovie = () => {
    setIsAddingMovie(!isAddingMovie);
    setIsEditingMovie(null);
  };

  const startEditMovie = (movieId: string) => {
    setIsEditingMovie(movieId);
    setIsAddingMovie(false);
  };

  const cancelEdit = () => {
    setIsEditingMovie(null);
    setIsAddingMovie(false);
  };

  const deleteMovie = (movieId: string) => {
    // In a real app, this would be an API call
    const newMovies = movies.filter(movie => movie.id !== movieId);
    setMovies(newMovies);
  };

  const getTheaterName = (theaterId: string) => {
    const theater = theaters.find(t => t.id === theaterId);
    return theater ? theater.name : 'Unknown Theater';
  };

  const getShowtimesCount = (movieId: string) => {
    const movie = movies.find(m => m.id === movieId);
    return movie ? movie.showTimes.length : 0;
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-blue-500/20 p-3 mr-4">
                <FilmIcon className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-medium text-white">Movies</h3>
            </div>
            <p className="text-3xl font-bold text-white">{movies.length}</p>
            <p className="text-gray-400 text-sm mt-2">Total active movies</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-purple-500/20 p-3 mr-4">
                <TheaterIcon className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-medium text-white">Theaters</h3>
            </div>
            <p className="text-3xl font-bold text-white">{theaters.length}</p>
            <p className="text-gray-400 text-sm mt-2">Total theaters</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-green-500/20 p-3 mr-4">
                <TicketIcon className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-medium text-white">Showtimes</h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {movies.reduce((acc, movie) => acc + movie.showTimes.length, 0)}
            </p>
            <p className="text-gray-400 text-sm mt-2">Total showtime slots</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="rounded-full bg-orange-500/20 p-3 mr-4">
                <UsersIcon className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-medium text-white">Users</h3>
            </div>
            <p className="text-3xl font-bold text-white">2</p>
            <p className="text-gray-400 text-sm mt-2">Registered users</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-700">
            <nav className="flex overflow-x-auto">
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  selectedTab === 'movies'
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setSelectedTab('movies')}
              >
                Movies
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  selectedTab === 'theaters'
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setSelectedTab('theaters')}
              >
                Theaters
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  selectedTab === 'showtimes'
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setSelectedTab('showtimes')}
              >
                Showtimes
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  selectedTab === 'users'
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setSelectedTab('users')}
              >
                Users
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  selectedTab === 'settings'
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setSelectedTab('settings')}
              >
                Settings
              </button>
            </nav>
          </div>

          <div className="p-6">
            {selectedTab === 'movies' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Movies Management</h2>
                  <button
                    onClick={toggleAddMovie}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Movie
                  </button>
                </div>

                {isAddingMovie && (
                  <div className="bg-gray-700 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Add New Movie</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Movie Title</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                          placeholder="Enter movie title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Theater</label>
                        <select className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white">
                          <option value="">Select a theater</option>
                          {theaters.map(theater => (
                            <option key={theater.id} value={theater.id}>{theater.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Duration (minutes)</label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                          placeholder="Enter duration"
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Release Date</label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Genre (comma separated)</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                          placeholder="Action, Adventure, Comedy"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Image URL</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                          placeholder="Enter image URL"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                          placeholder="Enter movie description"
                        ></textarea>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Save Movie
                      </button>
                    </div>
                  </div>
                )}

                {isEditingMovie && (
                  <div className="bg-gray-700 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Edit Movie</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Movie Title</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                          defaultValue={movies.find(m => m.id === isEditingMovie)?.title}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Theater</label>
                        <select 
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                          defaultValue={movies.find(m => m.id === isEditingMovie)?.theaterId}
                        >
                          {theaters.map(theater => (
                            <option key={theater.id} value={theater.id}>{theater.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Duration (minutes)</label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                          defaultValue={movies.find(m => m.id === isEditingMovie)?.duration}
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Release Date</label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                          defaultValue={movies.find(m => m.id === isEditingMovie)?.releaseDate}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Genre (comma separated)</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                          defaultValue={movies.find(m => m.id === isEditingMovie)?.genre.join(', ')}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Image URL</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                          defaultValue={movies.find(m => m.id === isEditingMovie)?.image}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                          defaultValue={movies.find(m => m.id === isEditingMovie)?.description}
                        ></textarea>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Update Movie
                      </button>
                    </div>
                  </div>
                )}

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="text-xs text-gray-400 uppercase border-b border-gray-700">
                      <tr>
                        <th className="px-6 py-3">Movie</th>
                        <th className="px-6 py-3">Theater</th>
                        <th className="px-6 py-3">Duration</th>
                        <th className="px-6 py-3">Showtimes</th>
                        <th className="px-6 py-3">Release Date</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {movies.map(movie => (
                        <tr key={movie.id} className="border-b border-gray-700">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-10 h-14 overflow-hidden rounded mr-3 flex-shrink-0">
                                <img 
                                  src={movie.image} 
                                  alt={movie.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-medium text-white">{movie.title}</div>
                                <div className="text-xs text-gray-400">{movie.genre.join(', ')}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                            {getTheaterName(movie.theaterId)}
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                            {movie.duration} mins
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                            {getShowtimesCount(movie.id)}
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                            {new Date(movie.releaseDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => startEditMovie(movie.id)}
                                className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                                aria-label="Edit"
                              >
                                <EditIcon className="h-5 w-5" />
                              </button>
                              <button 
                                onClick={() => deleteMovie(movie.id)}
                                className="p-1 text-red-400 hover:text-red-300 transition-colors"
                                aria-label="Delete"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedTab === 'theaters' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Theaters Management</h2>
                  <button
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Theater
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="text-xs text-gray-400 uppercase border-b border-gray-700">
                      <tr>
                        <th className="px-6 py-3">Theater Name</th>
                        <th className="px-6 py-3">Location</th>
                        <th className="px-6 py-3">Screens</th>
                        <th className="px-6 py-3">Total Seats</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {theaters.map(theater => (
                        <tr key={theater.id} className="border-b border-gray-700">
                          <td className="px-6 py-4 font-medium text-white">
                            {theater.name}
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                            {theater.location}
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                            {theater.screens.length}
                          </td>
                          <td className="px-6 py-4 text-gray-300">
                            {theater.totalSeats}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button 
                                className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                                aria-label="Edit"
                              >
                                <EditIcon className="h-5 w-5" />
                              </button>
                              <button 
                                className="p-1 text-red-400 hover:text-red-300 transition-colors"
                                aria-label="Delete"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedTab === 'showtimes' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Showtimes Management</h2>
                  <button
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Showtime
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="text-xs text-gray-400 uppercase border-b border-gray-700">
                      <tr>
                        <th className="px-6 py-3">Movie</th>
                        <th className="px-6 py-3">Theater</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Time</th>
                        <th className="px-6 py-3">Price</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {movies.flatMap(movie => 
                        movie.showTimes.map(showTime => (
                          <tr key={showTime.id} className="border-b border-gray-700">
                            <td className="px-6 py-4 font-medium text-white">
                              {movie.title}
                            </td>
                            <td className="px-6 py-4 text-gray-300">
                              {getTheaterName(movie.theaterId)}
                            </td>
                            <td className="px-6 py-4 text-gray-300">
                              {showTime.date}
                            </td>
                            <td className="px-6 py-4 text-gray-300">
                              {showTime.time}
                            </td>
                            <td className="px-6 py-4 text-gray-300">
                              ${showTime.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <button 
                                  className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                                  aria-label="Edit"
                                >
                                  <EditIcon className="h-5 w-5" />
                                </button>
                                <button 
                                  className="p-1 text-red-400 hover:text-red-300 transition-colors"
                                  aria-label="Delete"
                                >
                                  <TrashIcon className="h-5 w-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">User Management</h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="text-xs text-gray-400 uppercase border-b border-gray-700">
                      <tr>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Role</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-700">
                        <td className="px-6 py-4 font-medium text-white">
                          Admin User
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          admin@example.com
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400">
                            Admin
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button 
                              className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                              aria-label="Edit"
                            >
                              <EditIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="px-6 py-4 font-medium text-white">
                          Regular User
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          user@example.com
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400">
                            User
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button 
                              className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                              aria-label="Edit"
                            >
                              <EditIcon className="h-5 w-5" />
                            </button>
                            <button 
                              className="p-1 text-red-400 hover:text-red-300 transition-colors"
                              aria-label="Delete"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">System Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-700 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Theater Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Company Name</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                          defaultValue="Cinema Hub"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Contact Email</label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                          defaultValue="contact@cinemahub.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                          defaultValue="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4">System Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">Enable Online Booking</p>
                          <p className="text-sm text-gray-400">Allow users to book tickets online</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">Maintenance Mode</p>
                          <p className="text-sm text-gray-400">Temporarily disable user access</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Booking Window (days)</label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                          defaultValue="14"
                          min="1"
                        />
                        <p className="text-xs text-gray-500 mt-1">How many days in advance tickets can be booked</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;