## Welcome to week 4

___

#### 1. Decentralized systems

\- The trust trail is defined by these operations: 

+ Validate transaction

+ Verify gas and resources

+ Gather transactions to create a block

+ Execute transaction to get a new state

+ Form a new block

+ Work towards consensus mechanism

+ Everyone add the block to their chain and confirm the transactions.

#### 2. Consensus protocol

\- **A secure chain** is a single main chain with ***a consistent state***. Every valid block added to this chain, adds to the trust level of the chain. 

> Is there a method or protocol to choose the next block without conflict what if every miners want to add new blocks to the chain?

\- **Solution:** Proof of Work (PoW) - In this lecture, we will see how it works from miners' point of view: 

+ First, compute the *hash of the block header* resulting in a fixed value. Then, we add **Nonce** that is a variable to this value.

+ Next, we check if (Nonce + Hash) < $2^{128}$ for Bitcoin or (Nonce + Hash) < Difficulty for Ethereum, the puzzle will be solved. If not, we change the variable Nonce until conditions are satisfied. The first to solve the puzzle, wins the lottery. 

+ After that, the winning miner will broadcast its new block and other miners would verify it.

\- To find more about other Consensus Protocol, you can read the article of CoinDesk. [Link](https://www.coindesk.com/markets/2017/03/04/a-short-guide-to-blockchain-consensus-protocols/) 

#### 3. Robustness

\- **Robustness** is the ability to satisfactorily *manage exceptional situations*.

\- **Some exceptions**: 

+ Double Spending (For Ethereum, Account number and Global Nonce with timestamp in it solve this problem)

+ Chain split

#### 4. Forks 

\- **Soft folk and hard fork:** are like the release of software patches and new versions of operating systems respectively.

