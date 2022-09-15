pragma solidity 0.5.9;

contract Ballot {
    struct Voter {
        uint weight;
        uint vote;
        bool voted;
    }
    struct Proposal {
        uint voteCount;
    }

    Proposal[] public proposals; 

    mapping(address => Voter) voters;
    address chairperson; 

    constructor(uint _numProposals) {
        chairperson = msg.sender;
        proposals.length = _numProposals; // unavailable for version >= v0.6
        voters[chairperson].weight = 2;
    }

    function getContractAddress() public view returns (address _contractAddress) {
        _contractAddress = chairperson;
    }

    function register(address toVoter) public {
        if (msg.sender != chairperson || voters[toVoter].voted) return;
        voters[toVoter].weight = 1;
        voters[toVoter].voted = false;
    }

    function vote(uint toProposal) public {
        Voter storage sender = voters[msg.sender];
        if (sender.voted || toProposal > proposals.length || toProposal <= 0) return;

        sender.vote = toProposal;
        sender.voted = true;
        proposals[toProposal].voteCount += sender.weight;
    }

    function winningProposal() public view returns (uint _winningProposal){
        uint winningVoteCount = 0;
        for (uint8 prop = 0; prop < proposals.length; prop++)
            if (proposals[prop].voteCount > winningVoteCount) {
                winningVoteCount = proposals[prop].voteCount;
                _winningProposal = prop;
            }
    }

}
