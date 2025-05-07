// config.js

const config = {
    // Contract ABI (the compiled contract interface) - Replace with your actual ABI
    contractABI: [
      // ABI array goes here
    ],
    // Contract Address (this should be the address of your deployed contract)
    contractAddress: "0xYourContractAddress",  // Replace with actual contract address
  
    // Web3 Configuration
    web3Provider: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",  // You can use other providers, like local ganache or testnets
    
    // Network Configuration - set the network for deployment (e.g., Ethereum mainnet, Rinkeby, etc.)
    networkId: 1, // For Ethereum Mainnet (use the respective network ID for testnets)
    
    // Optionally, if you are using a custom provider for local development
    localProvider: "http://127.0.0.1:8545",  // For local blockchain like Ganache
  };
  
  export default config;
  