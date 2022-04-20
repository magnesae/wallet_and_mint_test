import classes from '../styles/Header.module.scss';
import { useEffect } from 'react';

import WalletConnect from './WalletConnect';

const Header = (props: any) => {
  useEffect(() => {});

  return (
    <div className={classes.header}>
      <WalletConnect />
    </div>
  );
};

export default Header;
