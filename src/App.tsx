// import React from 'react';
// import ReactDOM from 'react-dom';

import Header from './components/Header';
import LazyMint from './components/LazyMint';
import Faucet from './components/Faucet';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Divider } from '@chakra-ui/react';

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
        <Link to="/faucet">Faucet</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>Welcome to BSL Network!</div>} />
        <Route path="mint" element={<LazyMint />} />
        <Route path="faucet" element={<Faucet />} />
      </Routes>
    </div>
  );
}

export default App;
