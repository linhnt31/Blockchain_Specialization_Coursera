pragma solidity ^0.5.9;

// In the version 3, Instead of using if-else statements, we use modifiers to restrict accesses of functions

contract Ballot {
    struct Voter {
        uint weight;
        uint vote;
        bool voted;
    }
    struct Proposal {
        uint voteCount;
    }

    // Add stages for ballot
    enum Stage {Ini, Reg, Vot, Done}
    Proposal[] public proposals; 
    uint startTime;
    Stage public currState = Stage.Ini;

    mapping(address => Voter) voters;
    address chairperson; 

    // Add modifiers 
    modifier validState(Stage inputStage){
        require(currState == inputStage, "Incorrect stage");
        _;
    }

    // Add event to inform the voting procedures done
    event votingCompleted(); 

    constructor(uint _numProposals) public {
        chairperson = msg.sender;
        proposals.length = _numProposals;
        voters[chairperson].weight = 2;
        // Initialize the beginning of a contract
        startTime = block.timestamp;
        currState = Stage.Reg; 
    }

    function getContractAddress() public view returns (address _contractAddress) {
        _contractAddress = chairperson;
    }

    // Get the stage the ballot process is in 
    function getStage() public view returns (uint) {
        return uint(currState);
    }

    // Using modifier to check whether the current State is Register
    function register(address toVoter) public validState(Stage.Reg){
        // I think we also need to check the period of register time is over ? If true, we also need to not call this func
        // But this is example for understanding how to use solidity --> I will ignore this problem
        // if (currState != Stage.Reg) {
        //     return;
        // }
        if (msg.sender != chairperson || voters[toVoter].voted) {
            return;
        }
        voters[toVoter].weight = 1;
        voters[toVoter].voted = false;
        // if the period of register time is over --> Close the register stage 
        if (block.timestamp >= (startTime + 15 seconds)) {
            currState = Stage.Vot;
        } 
    }

    function vote(uint toProposal) public validState(Stage.Vot) {
        // if (currState != Stage.Vot) {
        //     return;
        // }
        Voter storage sender = voters[msg.sender];
        if (sender.voted || toProposal >= proposals.length || toProposal < 0) return;

        sender.vote = toProposal;
        sender.voted = true;
        proposals[toProposal].voteCount += sender.weight;

        // if the period of vote time is over --> Close the vote stage 
        if (block.timestamp >= (startTime + 40 seconds)) {
            currState = Stage.Done;
            emit votingCompleted();
        }
    }

    function winningProposal() public validState(Stage.Done) view returns (uint _winningProposal){
        uint winningVoteCount = 0;
        for (uint8 prop = 0; prop < proposals.length; prop++)
            if (proposals[prop].voteCount > winningVoteCount) {
                winningVoteCount = proposals[prop].voteCount;
                _winningProposal = prop;
            }
    }

}
