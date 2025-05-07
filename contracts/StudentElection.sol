// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentElection {

    struct Candidate {
        string name;
        uint voteCount;
    }

    address public admin;
    mapping(string => Candidate[]) public roleToCandidates;
    mapping(address => mapping(string => bool)) public hasVoted;

    constructor() {
        admin = msg.sender;
    }

    function addCandidate(string memory role, string memory name) public {
        require(msg.sender == admin, "Only admin can add candidates");
        roleToCandidates[role].push(Candidate(name, 0));
    }

    function vote(string memory role, uint candidateIndex) public {
        require(!hasVoted[msg.sender][role], "Already voted for this role");
        roleToCandidates[role][candidateIndex].voteCount++;
        hasVoted[msg.sender][role] = true;
    }

    function getCandidates(string memory role) public view returns (Candidate[] memory) {
        return roleToCandidates[role];
    }
}
