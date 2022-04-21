// import React from 'react';
// import ReactDOM from 'react-dom';

import classes from '../styles/Navigation.module.scss';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';

import LazyMint from './LazyMint';
import Faucet from './Faucet';

const Navigation = (props: any) => {
  return (
    <div>
      <nav className={classes.nav}>
        <ul className={classes.ul}>
          <li className={classes.li}>
            <Link to="/">Home</Link>
          </li>
          <li className={classes.li}>
            <Link to="/mint">Mint</Link>
          </li>
          <li className={classes.li}>
            <Link to="/faucet">Faucet</Link>
          </li>
          <li className={classes.li}>
            <a href="http://3.39.16.90:4000/">Blockscout</a>
          </li>
          <Header />
        </ul>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <br />
              Welcome to BSL Network!
            </div>
          }
        />
        <Route path="mint" element={<LazyMint />} />
        <Route path="faucet" element={<Faucet />} />
      </Routes>
    </div>
  );
};

export default Navigation;
