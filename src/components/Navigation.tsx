// import React from 'react';
// import ReactDOM from 'react-dom';

import classes from '../styles/Navigation.module.scss';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import LazyMint from './LazyMint';
import Faucet from './Faucet';

const Navigation = (props: any) => {
  return (
    <div>
      <nav className={classes.nav}>
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
};

export default Navigation;
