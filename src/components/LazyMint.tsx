import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

async function getAddress() {
  const address = await signer.getAddress();
  return address;
}

async function sendTransaction() {
  const tx = await signer.sendTransaction({
    to: '0x832b6C35e7B8d0D6f912e5C5C6549cd0A48D8e92',
    value: ethers.utils.parseEther('1.0'),
  });
  console.log(tx);
  return tx;
}

const LazyMint = (props: any) => {
  const [address, setAddress] = useState() as any;
  const [hash, setHash] = useState() as any;
  const [buttonClicked, setButtonClicked] = useState(false) as any;
  const [connection, setConnection] = useState(false) as any;

  useEffect(() => {});

  const mint = async () => {
    const address = await getAddress();
    console.log('Address: ' + address);
    setAddress(address);
    setButtonClicked(true);
  };

  const send = async () => {
    const tx = await sendTransaction();
    setHash(tx.hash);

    setButtonClicked(true);
  };

  return (
    <>
      {' '}
      {!buttonClicked ? (
        <button onClick={send}>Lazy Mint (Send Transaction for now lol)</button>
      ) : (
        <div>
          <div>TX hash: {hash}</div>
        </div>
      )}
    </>
  );
};

export default LazyMint;
