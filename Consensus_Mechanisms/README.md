## Consensus mechanisms 

___ 

This post extracts some important takeaways is taken from share's Shawn in https://www.mangoresearch.co/. 

#### 1. How Are Blockchain Transactions Validated? [1]

##### 1.1. Blockchain validators

\- **Blockchain validator:** is responsible for verifying transactions and is a ***full node*** that downloads all blocks (including headers, transactions, and receipts). 

##### 1.2. Differentiation between Validation and Consensus

To distinguish two concepts, we firstly are to understand the definitions and how they work. 

\- **Validation:** verifying transactions are eligible (not not malicious, double spends,...).

\- **Consensus:**

+ involves determining the `ordering of validated transactions`. 

+ Deciding who's block is included onto the chain. 

+ reaching consensus means that at least ***51% of the nodes*** on the network agree on the next global state of the network. [4]

\- **NOTE:** From two definitions, we can see that the validation precedes the consensus. 

##### 1.3. Proof of Work (PoW) and Proof of Stake (PoS)

\- In `PoW`, miners compete against each other to solve a **cryptographic puzzle**. The winning miner's block will be **included to the chain** and this miner gets an **incentive**. 

+ Miners need to do intense computational work.

\- In `PoS`, validators staked their coins into a jar. A coin is randomly picked from the jar. If it belongs to A, A's block will be added to the chain. 

\- **NOTE:** Is Proof Of Stake Less Resource Intensive Than PoW? [5]

+ Yes, Both PoS and PoW verify transactions but the process of solving cryptographic puzzles consumes a large majority of the resources. 

#### 2. Proof Of Work: Determining Majority “Power” [2-3]

In the previous part, we have grasped an overview about PoW. It's time to deep dive into it. 

\- PoW is invented adopting the following requirements to solve preceded solutions based on Ip addresses or rasing hands, etc: 

+ Add a [difficulty](https://www.coindesk.com/learn/bitcoin-mining-difficulty-everything-you-need-to-know/#:~:text=Bitcoin's%20mining%20difficulty%20is%20updated,to%20mine%20a%20new%20block.) to casting vote or the hash of a block starts with a specific number of zero's

+ Make it costly for attempting manipulation (spamming, tampering)

> Proof Of Work uses **CPU Power/Energy** to determine the majority decision. Each time a block is added to the Blockchain, CPU power/energy is consumed. 

\- Miners sacrifice *electricity costs* for solving puzzles ? So, What exactly is the **cryptographic puzzle**?

+ It is a hashing number and miners know this number but they cannot directly generate it. 

+ To win, miners needs to change **Nonce** value until **fixed components** (transaction data, block data, etc) + **Nonce** = Cryptographic puzzle (hashing number). 


## References

+ [1. How Are Blockchain Transactions Validated? Consensus VS Validation](https://www.mangoresearch.co/blockchain-consensus-vs-validation/)

+ [2. Proof Of Work: Determining Majority “Power”](https://www.mangoresearch.co/proof-of-work-determining-majority-power/)

+ [3. Cryptographic Puzzle – Understanding Proof of Work](https://www.mangoresearch.co/cryptographic-puzzle-proof-of-work/)

+ [4. Ethereum - CONSENSUS MECHANISMS](https://ethereum.org/en/developers/docs/consensus-mechanisms/)

+ [5. Is Proof Of Stake Less Resource Intensive Than PoW?](https://www.mangoresearch.co/is-proof-of-stake-less-resource-intensive/)