// import styled from 'styled-components';
import { useState, useEffect } from 'react';

// import { getBalance } from '../utils/GetInfo';
import { ethers } from 'ethers';

async function requestAccount() {
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  return accounts;
}

async function getBalance() {
  const balance = await signer.getBalance();
  return balance;
}

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const WalletConnect = (props: any) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState() as any;
  const [balance, setBalance] = useState() as any;

  useEffect(() => {});

  const isWallet = () => {
    if (typeof window.ethereum !== 'undefined') {
      return true;
    } else {
      return false;
    }
  };

  const wallet = async () => {
    if (isWallet()) {
      const accounts = await requestAccount();

      if (typeof accounts[0] !== 'undefined') {
        setAccount(accounts[0]);

        // const bal = await getBalance(accounts[0]);
        const bal = await getBalance();
        setBalance(bal._hex);

        setIsConnected(true);
      }
    }
  };

  return (
    <>
      {!isConnected ? (
        <button
          onClick={wallet}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="row-auto">
          <div>
            Account: {account.slice(0, 6)}...{account.slice(-4)}
          </div>
          <div>
            Balance: {(parseInt(balance, 16) / Math.pow(10, 18)).toFixed(3)} ETH
          </div>
        </div>
      )}
    </>
  );
};

export default WalletConnect;
