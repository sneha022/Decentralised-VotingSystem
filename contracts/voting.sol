// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    address public admin;

    struct Nominee {
        string name;
        string symbol;
        uint voteCount;
    }

    Nominee[] public nominees;
    mapping(address => bool) public hasVoted;

    constructor() {
        admin = msg.sender;
    }

    function registerNominee(string memory _name, string memory _symbol) public {
        require(msg.sender == admin, "Only admin can register");
        nominees.push(Nominee(_name, _symbol, 0));
    }

    function vote(uint nomineeIndex) public {
        require(!hasVoted[msg.sender], "Already voted");
        require(nomineeIndex < nominees.length, "Invalid nominee");

        hasVoted[msg.sender] = true;
        nominees[nomineeIndex].voteCount++;
    }

    function getNominees() public view returns (Nominee[] memory) {
        return nominees;
    }
}
