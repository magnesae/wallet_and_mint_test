// import React from 'react';
// import ReactDOM from 'react-dom';

import Header from './components/Header';
import LazyMint from './components/LazyMint';
import Test from './components/Test';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="text-center">
      <header
        className="text-right"
        style={{
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          paddingRight: '1rem',
        }}
      >
        <Header />
      </header>
      <nav
        style={{
          borderTop: 'solid 1px',
          paddingTop: '1rem',
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to="/">Home</Link> | <Link to="/mint">Mint</Link> |{' '}
        <Link to="/test">Test</Link>
      </nav>
      <Routes>
        <Route path="mint" element={<LazyMint />} />
        <Route path="test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
