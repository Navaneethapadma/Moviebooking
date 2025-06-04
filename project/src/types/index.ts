// User types
export interface User {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Movie types
export interface Movie {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: number; // in minutes
  genre: string[];
  releaseDate: string;
  theaterId: string;
  showTimes: ShowTime[];
}

export interface ShowTime {
  id: string;
  time: string;
  date: string;
  price: number;
}

// Theater types
export interface Theater {
  id: string;
  name: string;
  location: string;
  totalSeats: number;
  screens: Screen[];
}

export interface Screen {
  id: string;
  name: string;
  totalSeats: number;
  rows: number;
  columns: number;
  seatMap: Seat[][];
}

export interface Seat {
  id: string;
  row: string;
  column: number;
  status: 'available' | 'booked' | 'reserved' | 'disabled';
  price: number;
  type: 'standard' | 'premium' | 'vip';
}