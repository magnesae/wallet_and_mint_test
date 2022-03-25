import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from './../contracts/LazyMintTestAbi.json';

const LazyMint = (props: any) => {
  const [address, setAddress] = useState() as any;
  const [hash, setHash] = useState() as any;
  const [buttonClicked, setButtonClicked] = useState(false) as any;
  const [connection, setConnection] = useState(false) as any;
  const [result, setResult] = useState() as any;
  const [numberOfTokens, setNumberOfTokens] = useState('');

  const contractAddress = '0x3CEd0a87aE8C42832ff5a0dE575Cc21bEFc2a8B6';

  const baseUri =
    'https://gateway.pinata.cloud/ipfs/QmUtA6ys1BMShyURECB1MzTXgKXvJVc7rudjWxPz6nBy6w/';

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const lazyMintContract = new ethers.Contract(contractAddress, abi, signer);

  useEffect(() => {});

  function MyForm() {
    return (
      <form>
        <label>
          Enter the amount of NFTs you want to mint (max 3):
          <input
            type="text"
            value={numberOfTokens}
            onChange={(e) => setNumberOfTokens(e.target.value)}
          />
        </label>
      </form>
    );
  }

  const getAddress = async () => {
    const address = await signer.getAddress();
    return address;
  };

  const getPrice = async () => {
    const price = await lazyMintContract.price();
    return ethers.utils.formatEther(price);
  };

  const send = async () => {
    const tx = await signer.sendTransaction({
      to: '0x832b6C35e7B8d0D6f912e5C5C6549cd0A48D8e92',
      value: ethers.utils.parseEther('1.0'),
    });
    return tx;
  };

  const mint = async () => {
    const price = await getPrice();
    const payPrice = Number(price) * Number(numberOfTokens);
    const options = { value: ethers.utils.parseEther(payPrice.toString()) };
    let result = await lazyMintContract.lazyMint(numberOfTokens, options);
    console.log('Result for lazyMint: ', result);
    setResult(result.hash);
    setButtonClicked(true);
  };

  return (
    <>
      {' '}
      <MyForm />
      {!buttonClicked ? (
        <button onClick={mint}>Lazy Mint</button>
      ) : (
        <div>
          <div>Lazy Mint result: {result}</div>
        </div>
      )}
    </>
  );
};

export default LazyMint;
