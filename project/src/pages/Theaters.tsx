import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Theater, Screen } from '../types';
import { data } from '../data';
import { PlusIcon, EditIcon, TrashIcon, XIcon } from 'lucide-react';

const Theaters: React.FC = () => {
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null);
  const [isAddingTheater, setIsAddingTheater] = useState(false);
  const [isAddingScreen, setIsAddingScreen] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    setTheaters(data.theaters);
  }, []);

  const selectTheater = (theater: Theater) => {
    setSelectedTheater(theater);
    setIsAddingTheater(false);
    setIsAddingScreen(false);
  };

  const toggleAddTheater = () => {
    setIsAddingTheater(!isAddingTheater);
    setSelectedTheater(null);
    setIsAddingScreen(false);
  };

  const toggleAddScreen = () => {
    setIsAddingScreen(!isAddingScreen);
  };

  const deleteTheater = (theaterId: string) => {
    // In a real app, this would be an API call
    const newTheaters = theaters.filter(theater => theater.id !== theaterId);
    setTheaters(newTheaters);
    if (selectedTheater && selectedTheater.id === theaterId) {
      setSelectedTheater(null);
    }
  };

  const deleteScreen = (screenId: string) => {
    if (!selectedTheater) return;
    
    // In a real app, this would be an API call
    const updatedScreens = selectedTheater.screens.filter(screen => screen.id !== screenId);
    const updatedTheater = {
      ...selectedTheater,
      screens: updatedScreens,
      totalSeats: updatedScreens.reduce((total, screen) => total + screen.totalSeats, 0)
    };
    
    const updatedTheaters = theaters.map(theater => 
      theater.id === selectedTheater.id ? updatedTheater : theater
    );
    
    setTheaters(updatedTheaters);
    setSelectedTheater(updatedTheater);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Theaters Management</h1>
          <button
            onClick={toggleAddTheater}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Theater
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white">Theaters</h2>
              </div>
              <div className="divide-y divide-gray-700">
                {theaters.map(theater => (
                  <div 
                    key={theater.id}
                    className={`p-4 cursor-pointer flex justify-between items-center ${
                      selectedTheater?.id === theater.id ? 'bg-gray-700' : 'hover:bg-gray-700'
                    }`}
                    onClick={() => selectTheater(theater)}
                  >
                    <div>
                      <h3 className="font-medium text-white">{theater.name}</h3>
                      <p className="text-sm text-gray-400">{theater.location}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // Edit logic would go here
                          selectTheater(theater);
                        }}
                        className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                        aria-label="Edit"
                      >
                        <EditIcon className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTheater(theater.id);
                        }}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                        aria-label="Delete"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {isAddingTheater ? (
              <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">Add New Theater</h2>
                  <button 
                    onClick={toggleAddTheater}
                    className="text-gray-400 hover:text-white"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Theater Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      placeholder="Enter theater name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      placeholder="Enter location"
                    />
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Save Theater
                    </button>
                  </div>
                </div>
              </div>
            ) : selectedTheater ? (
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-700">
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedTheater.name}</h2>
                  <p className="text-gray-400">{selectedTheater.location}</p>
                  <div className="mt-4 flex items-center space-x-4 text-sm">
                    <div className="text-gray-300">
                      <span className="font-medium">{selectedTheater.screens.length}</span> Screens
                    </div>
                    <div className="text-gray-300">
                      <span className="font-medium">{selectedTheater.totalSeats}</span> Total Seats
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-white">Screens</h3>
                    <button
                      onClick={toggleAddScreen}
                      className="flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add Screen
                    </button>
                  </div>

                  {isAddingScreen && (
                    <div className="bg-gray-700 rounded-lg p-4 mb-6">
                      <h4 className="text-white font-medium mb-3">Add New Screen</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Screen Name</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                            placeholder="Enter screen name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Total Seats</label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                            placeholder="Enter total seats"
                            min="1"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Rows</label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                            placeholder="Enter number of rows"
                            min="1"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Columns</label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
                            placeholder="Enter number of columns"
                            min="1"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={toggleAddScreen}
                          className="px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-500 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Save Screen
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedTheater.screens.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-400">No screens added yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedTheater.screens.map(screen => (
                        <div key={screen.id} className="bg-gray-700 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-white font-medium mb-1">{screen.name}</h4>
                              <div className="flex flex-wrap text-sm text-gray-400">
                                <span className="mr-4">{screen.totalSeats} Seats</span>
                                <span>{screen.rows} Rows × {screen.columns} Columns</span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button 
                                className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                                aria-label="Edit Screen"
                              >
                                <EditIcon className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => deleteScreen(screen.id)}
                                className="p-1 text-red-400 hover:text-red-300 transition-colors"
                                aria-label="Delete Screen"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <h5 className="text-sm font-medium text-gray-400 mb-2">Seat Map Preview</h5>
                            <div className="bg-gray-800 p-3 rounded">
                              <div className="w-full h-1 bg-gray-600 rounded-full mb-6 relative">
                                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-gray-400 text-xs">Screen</div>
                              </div>
                              <div className="grid grid-cols-8 gap-1">
                                {Array.from({ length: Math.min(40, screen.rows * screen.columns) }).map((_, index) => (
                                  <div
                                    key={index}
                                    className="aspect-square bg-gray-600 rounded-sm flex items-center justify-center text-xs text-gray-400"
                                  >
                                    {String.fromCharCode(65 + Math.floor(index / 8))}{index % 8 + 1}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                <p className="text-gray-400">Select a theater or add a new one to manage details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Theaters;