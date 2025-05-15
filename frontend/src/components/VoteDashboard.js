import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Voting from '../contracts/Voting.json';
import axios from 'axios';


const VoteDashboard = () => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [nominees, setNominees] = useState([]);
  const [voted, setVoted] = useState(false);

  const loadBlockchain = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Voting.networks[networkId];
    const instance = new web3.eth.Contract(Voting.abi, deployedNetwork.address);
    setContract(instance);

    const hasVoted = await instance.methods.hasVoted(accounts[0]).call();
    setVoted(hasVoted);

    const nom = await instance.methods.getNominees().call();
    setNominees(nom);
  };

  const vote = async (index) => {
    await contract.methods.vote(index).send({ from: account });
    alert("Voted successfully!");
    setVoted(true);
  };

  useEffect(() => {
    loadBlockchain();
  }, []);

  return (
    <div>
      <h2>Welcome, {account}</h2>
      {voted ? (
        <h3>You have already voted!</h3>
      ) : (
        <>
          <h3>Nominees:</h3>
          <ul>
            {nominees.map((n, i) => (
              <li key={i}>
                {n.name} - {n.symbol}
                <button onClick={() => vote(i)}>Vote</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default VoteDashboard;
