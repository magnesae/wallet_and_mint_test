// import React from 'react';
// import ReactDOM from 'react-dom';

import Header from './components/Header';
import LazyMint from './components/LazyMint';

function App() {
  return (
    <div className="text-center">
      <header>
        <Header />
      </header>
      <header className="text-center">
        <LazyMint />
      </header>
    </div>
  );
}

export default App;
