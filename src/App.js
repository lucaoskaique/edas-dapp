import './App.css';
import { useEffect, useState } from 'react';

const App = () => {

  //state variable to store user's public wallet 
  const [currentAccount, setCurrentAccount] = useState("");

  // check wallet connection when the page loads
  const checkIfWalletIsConnected = async () => {

    // access to window.ethereum
    const { ethereum } = window;

    //check if user has metamask 
    if (!ethereum) {
      alert("Make sure you have metamask");
      return;
    }

    //get the wallet account
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    //get the first account
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found account:", account);

      //set the account as a state 
      setCurrentAccount(account);
    }
    else {
      console.log("No account");
    }
  }

  // connect to wallet 
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Opps, looks like there is no wallet!");
        return;
      }

      const currentNetwork = ethereum.networkVersion;
      console.log("Current network", currentNetwork);

      // request to switch the network 
      const tx = await ethereum.request({
        method: 'wallet_switchEthereumChain', params: [{
          chainId:
            '0x4'
        }]
      }).catch()
      if (tx) {
        console.log(tx)
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);

    }
    catch (error) {
      console.log(error);
    }
  }

  //run function checkIfWalletIsConnected when the page loads
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  //connect to wallet
  const walletNotConnected = () => (
    <button onClick={connectWallet} className="connect-to-wallet-button">
      Connect to Wallet
    </button>
  );

  //wallet connected
  const walletConnected = () => (
    <div>
      <p>Connected to the wallet</p>
    </div>
  );

  // define avax network values 
  const avax_mainnet = [{
    chainId: '0xA86A',
    chainName: 'Avalanche Mainnet C-Chain',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://snowtrace.io/']
  }]



  return (
    <div className="App">
      <br />
      <div style={{ display: 'flex', justifyContent: 'center', height: '50px' }}>
        {currentAccount === "" ? walletNotConnected() : walletConnected()}
        <br />
      </div>
    </div >
  );
};

export default App;
