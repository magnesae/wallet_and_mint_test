import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useForm } from 'react-hook-form';

const Faucet = (props: any) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    setAddressTo(data.addressTo);
    setAmount(data.amount);
  };

  const [block, setBlock] = useState() as any;
  const [balance, setBalance] = useState() as any;
  const [hash, setHash] = useState() as any;
  const [addressTo, setAddressTo] = useState('') as any;
  const [amount, setAmount] = useState() as any;
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {});

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const privateKey =
    'b04753d542cb3f3894e0a62199634318b1210983c728adba99b1f8117507d85f';

  const nodeProvider = new ethers.providers.JsonRpcProvider(
    'http://3.39.16.90:8545',
  );

  const nodeWallet = new ethers.Wallet(privateKey, nodeProvider);

  const nodeSigner = nodeProvider.getSigner();

  // let addressTo = '0x3BD56B724E9FcE95da634D314444092Fdba79dc7';
  // let amount = '0.1';

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

    const signedTx = await nodeWallet.signTransaction(tx);
    console.log('Signed Transaction:', signedTx);

    const txHash = ethers.utils.keccak256(signedTx);
    console.log('Precomputed txHash:', txHash);

    let res = await nodeProvider.sendTransaction(signedTx);
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
            <input
              style={{
                borderColor: 'black',
                borderWidth: 1,
              }}
              {...register('addressTo')}
            />
          </div>
          <br />
          <div>
            <p>Amount in ETH:</p>
            <input
              style={{
                borderColor: 'black',
                borderWidth: 1,
              }}
              {...register('amount')}
            />
          </div>
        </form>
      </div>
      <br />
      <div>
        {!buttonClicked ? (
          <button
            onClick={sendTransaction}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Get ETH
          </button>
        ) : (
          <div>
            <div>Transaction hash: {hash}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Faucet;
