import classes from '../styles/Faucet.module.scss';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useForm } from 'react-hook-form';
// import 'dotenv/config';

const Faucet = (props: any) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    setAddressTo(data.addressTo);
    // setAmount(data.amount);
  };

  const [block, setBlock] = useState() as any;
  const [balance, setBalance] = useState() as any;
  const [hash, setHash] = useState() as any;
  const [addressTo, setAddressTo] = useState('') as any;
  // const [amount, setAmount] = useState() as any;
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errormsg, setErrormsg] = useState() as any;

  useEffect(() => {});

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const privateKey = process.env.REACT_APP_NODE_ONE_PK as any;
  const nodeAddress = process.env.REACT_APP_NODE_ONE_ADDR as any;

  const nodeProvider = new ethers.providers.JsonRpcProvider(nodeAddress);

  const nodeWallet = new ethers.Wallet(privateKey, nodeProvider);

  const nodeSigner = nodeProvider.getSigner();

  const getBlocknumber = async () => {
    let blockNumber = await provider.getBlockNumber();
    setBlock(blockNumber);
    setButtonClicked(true);
  };

  const getBalance = async () => {
    let balance = await provider.getBalance(
      '0xbd3cca918e7545cc8aafab8d848a85dbcfbe49ee',
    );
    console.log(balance.toString());
    setBalance(balance.toString());
    setButtonClicked(true);
  };

  const sendTransaction = async () => {
    let nonce = await nodeProvider.getTransactionCount(nodeWallet.address);
    let feeData = await nodeProvider.getFeeData();
    console.log('Fee Data:', feeData);
    const amount = '1';

    const tx = {
      type: 2,
      nonce: nonce,
      to: addressTo, // Address to send to
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas?._hex, // Recommended maxPriorityFeePerGas
      maxFeePerGas: feeData.maxFeePerGas?._hex, // Recommended maxFeePerGas
      value: ethers.utils.parseEther(amount), // .01 ETH
      gasLimit: '21000', // basic transaction costs exactly 21000
      chainId: 1337, // Ethereum network id
    };
    console.log('Transaction Data:', tx);

    let signedTx: any;

    try {
      signedTx = await nodeWallet.signTransaction(tx);
    } catch (e: any) {
      if (e) {
        setErrormsg(e.toString());
        setIsError(true);
        return e;
      }
    }

    console.log('Signed Transaction:', signedTx);

    const txHash = ethers.utils.keccak256(signedTx);
    console.log('Precomputed txHash:', txHash);

    let res: any;
    try {
      res = await nodeProvider.sendTransaction(signedTx);
    } catch (e: any) {
      if (e) {
        setErrormsg(e.toString());
        setIsError(true);
        return e;
      }
    }
    console.log('Receipt:', res);

    setButtonClicked(true);
    setHash(res.hash);
  };

  // const handleSubmitBtn = (data) => {
  //   setAddressTo(data.addressTo);
  //   setAmount(data.amount);
  // };

  return (
    <>
      <br />
      <div>
        <form onChange={handleSubmit(onSubmit)}>
          <div>
            <p>Address to send to:</p>
            <input className={classes.inputBox} {...register('addressTo')} />
          </div>
          {/* <div>
            <p>Amount in ETH:</p>
            <input className={classes.inputBox}
              {...register('amount')}
            />
          </div> */}
        </form>
      </div>
      <br />
      <div>
        {!buttonClicked ? (
          <button onClick={sendTransaction} className={classes.btn}>
            Get BSL
          </button>
        ) : (
          <div>
            <div>Transaction hash: {hash}</div>
          </div>
        )}
        <div>{errormsg}</div>
      </div>
    </>
  );
};

export default Faucet;
