import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
// import abi from './../contracts/LazyMintTestAbi.json';
import whitelistAbi from './../contracts/WhiteListTestAbi.json';
import addresses from './../whitelist/addresses.json';

const LazyMint = (props: any) => {
  // const [address, setAddress] = useState() as any;
  // const [hash, setHash] = useState() as any;
  const [buttonClicked, setButtonClicked] = useState(false) as any;
  const [preMintButtonClicked, setPreMintButtonClicked] = useState(
    false,
  ) as any;
  // const [connection, setConnection] = useState(false) as any;
  const [result, setResult] = useState() as any;
  const [preMintResult, setPreMintResult] = useState() as any;
  const [numberOfTokens, setNumberOfTokens] = useState('');

  // Local at home
  // const contractAddress = '0x3CEd0a87aE8C42832ff5a0dE575Cc21bEFc2a8B6';

  // Local at work
  // const contractAddress = '0x2774303b6B263972C10F87687803285e32ef519F';

  // const contractAddress = '0x20c349d320fC6c37582a79b743A2E4Fb21343429';

  // Mac at work, WhiteListContract
  const contractAddress = '0x24047ad7E1BF8b32815411e3eDDA7EFA24Fd79E7';

  // const unrevealedUri =
  //   'https://gateway.pinata.cloud/ipfs/QmRUW2fgQGq3c2DR3pzoYLPwkF3zD8i7HBzQvedkYB2Twm';

  // const baseUri =
  //   'https://gateway.pinata.cloud/ipfs/QmUtA6ys1BMShyURECB1MzTXgKXvJVc7rudjWxPz6nBy6w/';

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // const lazyMintContract = new ethers.Contract(contractAddress, abi, signer);
  const whitelistMintContract = new ethers.Contract(
    contractAddress,
    whitelistAbi,
    signer,
  );

  useEffect(() => {});

  function MyForm() {
    return (
      <form className="max-w-xs">
        <div className="flex items-center border-b border-teal-500 py-2">
          <label>
            Enter the amount of NFTs you want to mint (max 3):
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              value={numberOfTokens}
              onChange={(e) => {
                setNumberOfTokens(e.target.value);
              }}
            ></input>
          </label>
        </div>
      </form>
    );
  }

  const signAddress = async () => {
    let address = await getAddress();
    console.log('address: ', address);
    const pk =
      '1b867ffe3bea49abb24971e4ba1a2bd5fdd204fafbc160b372154fe2e0d55f6f';
    const addressSigner = new ethers.Wallet(pk);

    if (addresses.indexOf('address') !== -1) {
      return 'error';
    }

    let messageHash = ethers.utils.keccak256(address);

    console.log('Message Hash: ', messageHash);

    // Sign the hashed address
    let messageBytes = ethers.utils.arrayify(messageHash);
    let signature = await addressSigner.signMessage(messageBytes);
    console.log('Signature: ', signature);
    return signature;
  };

  const getAddress = async () => {
    const address = await signer.getAddress();
    return address;
  };

  const getPrice = async () => {
    // const price = await lazyMintContract.price();
    const price = await whitelistMintContract.PRICE();
    return ethers.utils.formatEther(price);
  };

  // const send = async () => {
  //   const tx = await signer.sendTransaction({
  //     to: '0x832b6C35e7B8d0D6f912e5C5C6549cd0A48D8e92',
  //     value: ethers.utils.parseEther('1.0'),
  //   });
  //   return tx;
  // };

  const preMint = async () => {
    let price = await getPrice();
    const options = { value: ethers.utils.parseEther(price) };
    let signature = await signAddress();
    console.log('Signature in preMint: ', signature);

    let result = await whitelistMintContract.presaleMint(1, signature, options);

    console.log('Result for preMint: ', result);
    setPreMintResult(result.hash);
    setPreMintButtonClicked(true);
  };

  const mint = async () => {
    const price = await getPrice();
    const payPrice = Number(price) * Number(numberOfTokens);
    const options = { value: ethers.utils.parseEther(payPrice.toString()) };
    // let result = await lazyMintContract.lazyMint(numberOfTokens, options);
    let result = await whitelistMintContract.publicMint(
      numberOfTokens,
      options,
    );
    console.log('Result for lazyMint: ', result);
    setResult(result.hash);
    setButtonClicked(true);
  };

  return (
    <>
      <div>
        <MyForm />
        {!buttonClicked ? (
          <button
            onClick={mint}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Lazy Mint
          </button>
        ) : (
          <div>
            <div>Lazy Mint result: {result}</div>
          </div>
        )}
      </div>
      <br />
      <div>
        {!preMintButtonClicked ? (
          <button
            onClick={preMint}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Presale Mint
          </button>
        ) : (
          <div>
            <div>Pre Mint result: {preMintResult}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default LazyMint;
