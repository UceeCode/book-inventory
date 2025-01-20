import React from 'react';
import './styles/App.css';
import BookList from './components/BookList';
import bookImage from './assets/images/book-removebg-preview.png'; 

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="heading">
        <h1 className="heading-Text">BOOK INVENTORY</h1>
        <img src={bookImage} alt="Book" className="heading-image" />
      </div>
      <BookList />
    </div>
  );
};

export default App;
