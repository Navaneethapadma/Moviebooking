import React from 'react';

const MovieCard = ({ posterUrl, title, releaseYear, rating }) => {
  return (
    // If you are using Tailwind CSS, this styling works out of the box.
    // Otherwise, you'll need to use a separate CSS file for styling.
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white transition duration-300 ease-in-out transform hover:scale-105">
      
      {/* Movie Poster Image */}
      <img 
        className="w-full h-72 object-cover" 
        src={posterUrl} 
        alt={`Poster for ${title}`} 
      />
      
      {/* Card Content */}
      <div className="p-4">
        
        {/* Title */}
        <div className="font-bold text-xl mb-2 text-gray-900 truncate">
          {title}
        </div>
        
        {/* Year and Rating container */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          
          {/* Release Year */}
          <span>
            <span className="font-semibold text-gray-700">Year:</span> {releaseYear}
          </span>
          
          {/* Rating */}
          <span className="flex items-center bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            ⭐ {rating.toFixed(1)} 
          </span>
        </div>
        
      </div>
    </div>
  );
};

export default MovieCard;