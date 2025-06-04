import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Movie, Theater, ShowTime } from '../types';
import { data } from '../data';
import { ClockIcon, FilterIcon, CalendarIcon } from 'lucide-react';

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedTheater, setSelectedTheater] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedShowTime, setSelectedShowTime] = useState<ShowTime | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    setMovies(data.movies);
    setTheaters(data.theaters);
  }, []);

  const allGenres = [...new Set(movies.flatMap(movie => movie.genre))];

  const filteredMovies = movies.filter(movie => {
    const matchesGenre = selectedGenre === '' || movie.genre.includes(selectedGenre);
    const matchesTheater = selectedTheater === '' || movie.theaterId === selectedTheater;
    const matchesSearch = searchQuery === '' || 
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesGenre && matchesTheater && matchesSearch;
  });

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setSelectedShowTime(null);
  };

  const handleSelectShowTime = (showTime: ShowTime) => {
    setSelectedShowTime(showTime);
  };

  const getTheaterName = (theaterId: string) => {
    const theater = theaters.find(t => t.id === theaterId);
    return theater ? theater.name : 'Unknown Theater';
  };

  const resetSelection = () => {
    setSelectedMovie(null);
    setSelectedShowTime(null);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Movies</h1>

        {!selectedMovie ? (
          <>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search movies..."
                  className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <div className="w-full md:w-auto">
                  <div className="relative inline-block w-full md:w-48">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FilterIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <select
                      className="block w-full pl-10 pr-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedGenre}
                      onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                      <option value="">All Genres</option>
                      {allGenres.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-auto">
                  <div className="relative inline-block w-full md:w-48">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FilterIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <select
                      className="block w-full pl-10 pr-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedTheater}
                      onChange={(e) => setSelectedTheater(e.target.value)}
                    >
                      <option value="">All Theaters</option>
                      {theaters.map(theater => (
                        <option key={theater.id} value={theater.id}>{theater.name}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMovies.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400">No movies found matching your criteria.</p>
                </div>
              ) : (
                filteredMovies.map(movie => (
                  <div 
                    key={movie.id} 
                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg group cursor-pointer"
                    onClick={() => handleSelectMovie(movie)}
                  >
                    <div className="relative overflow-hidden h-64">
                      <img 
                        src={movie.image} 
                        alt={movie.title} 
                        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-xl font-bold text-white">{movie.title}</h3>
                        <p className="text-gray-300 text-sm">
                          {movie.duration} mins | {movie.genre.join(', ')}
                        </p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-300 text-sm mb-2">
                        <span className="font-medium">Theater:</span> {getTheaterName(movie.theaterId)}
                      </p>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">{movie.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="text-gray-300 text-sm">
                          <span className="font-medium">From ₹{Math.min(...movie.showTimes.map(st => st.price))}</span>
                        </div>
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <button 
              onClick={resetSelection}
              className="text-blue-400 flex items-center mb-4 hover:text-blue-300 transition-colors ml-4 mt-4"
            >
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Movies
            </button>

            <div className="md:flex">
              <div className="md:w-1/3">
                <div className="relative h-96 overflow-hidden">
                  <img 
                    src={selectedMovie.image} 
                    alt={selectedMovie.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="md:w-2/3 p-6">
                <h2 className="text-3xl font-bold text-white mb-2">{selectedMovie.title}</h2>
                <div className="flex flex-wrap items-center mb-4 text-sm text-gray-400">
                  <span className="flex items-center mr-4">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {selectedMovie.duration} mins
                  </span>
                  <span className="flex items-center mr-4">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {new Date(selectedMovie.releaseDate).toLocaleDateString()}
                  </span>
                  <span className="mt-1 md:mt-0">{selectedMovie.genre.join(', ')}</span>
                </div>
                <p className="text-gray-300 mb-6">{selectedMovie.description}</p>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-3">Theater</h3>
                  <p className="text-gray-300">{getTheaterName(selectedMovie.theaterId)}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Showtimes & Tickets</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
                    {selectedMovie.showTimes.map(showTime => (
                      <button
                        key={showTime.id}
                        className={`px-3 py-2 rounded-md text-center transition-colors ${
                          selectedShowTime?.id === showTime.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                        onClick={() => handleSelectShowTime(showTime)}
                      >
                        <div className="font-medium">{showTime.time}</div>
                        <div className="text-xs">{showTime.date}</div>
                      </button>
                    ))}
                  </div>

                  {selectedShowTime && (
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">Price</h3>
                        <span className="text-2xl font-bold text-white">₹{selectedShowTime.price.toFixed(2)}</span>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-white mb-3">Seat Selection</h3>
                        <div className="bg-gray-900 p-4 rounded-md mb-6">
                          <div className="w-full h-2 bg-gray-700 rounded-full mb-8 relative">
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm">Screen</div>
                          </div>
                          
                          <div className="grid grid-cols-8 gap-2 mb-4">
                            {Array.from({ length: 40 }).map((_, index) => {
                              const isReserved = Math.random() > 0.7;
                              return (
                                <button
                                  key={index}
                                  disabled={isReserved}
                                  className={`
                                    aspect-square rounded-md flex items-center justify-center transition-colors
                                    ${isReserved ? 'bg-gray-600 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-blue-600 text-white'}
                                  `}
                                >
                                  {String.fromCharCode(65 + Math.floor(index / 8))}{index % 8 + 1}
                                </button>
                              );
                            })}
                          </div>
                          
                          <div className="flex justify-center gap-8 text-sm">
                            <div className="flex items-center">
                              <div className="w-4 h-4 bg-gray-700 rounded-sm mr-2"></div>
                              <span className="text-gray-400">Available</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-4 bg-blue-600 rounded-sm mr-2"></div>
                              <span className="text-gray-400">Selected</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-4 bg-gray-600 rounded-sm mr-2"></div>
                              <span className="text-gray-400">Reserved</span>
                            </div>
                          </div>
                        </div>
                        
                        <button className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors">
                          Book Ticket
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;