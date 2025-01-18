// src/App.tsx

import React from 'react';
import BookList from './components/BookList';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Book Inventory</h1>
      <BookList />
    </div>
  );
};

export default App;
