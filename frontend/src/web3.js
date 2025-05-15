import Web3 from 'web3';

// Create a new Web3 instance
const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");

export default web3;
