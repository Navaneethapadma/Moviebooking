import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard'; // Adjust path if necessary
// Assuming you have an API service to fetch data:
// import { fetchMovies } from '../services/movieService'; 

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Q9 in action: Use useEffect to fetch data on component mount
  useEffect(() => {
    // Replace this with your actual API call endpoint
    fetch('YOUR_MOVIE_API_ENDPOINT_HERE') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Assuming your API returns an array of movie objects
        setMovies(data.results); 
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty array ensures it runs only once (on mount)

  if (loading) return <div className="p-8 text-center">Loading movies...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Current Showings</h1>
      
      {/* Q7 in action: Mapping over an array and using the unique 'key' prop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} // Essential for list performance
            posterUrl={movie.poster_path} // Adjust keys to match your API response
            title={movie.title}
            releaseYear={movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
            rating={movie.vote_average || 0}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;