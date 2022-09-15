### Challenges and Solutions

___

##### 1. Consensus

\- **Consensus** means `general agreement` among ***full nodes***  about the next block of validated transactions to be added to the chain.

\- **Proof of Work:** computationally intensive (CPU and power)

+  Compute `Hash(block header, nonce)`, then compare this value with **$2^{128}$** for Bitcoin and **F** (difficulty) for Ethereum.


\- **Proof of Stake:** ***full node*** with the most at stake or coins is chosen for adding the next block.

\- **Practical Byzantine Fault Tolerance (PBFT):** tolerate node failures including malicious nodes. Nodes conduct voting to select a ***leader***, then the leader adds the next block. 

##### 2. Scalability 

\- In Blockchain systems, practitioners concern about ***the transaction rate*** or ***transactions per second*** that is a critical `metric` for `scalability`. 

\- We have two common methods to improve *scalability*: 

+ ***On-chain***: the adjustment of the block size. 

+ ***Off-chain***: the state channels.


\- To better understand two methods, I think we will go through the concepts of **on-chain** and **off-chain** transactions [1]: 

> Think of a blockchain as a cloud storage facility, which is divided into two parts — private and public. On-chain transactions are like the public cloud — visible to all, whereas off-chain transactions are like the private cloud; the data is not publicly accessible.

+ ***On-chain transactions:*** are `visible` to the Blockchain network and can be stored in the Distributed Ledger (DL). When it occurs, it will be validated, put into blocks and added to DL. This is a time-consuming and expensive (related to gas fees) process when the Blockchain network grows significantly => ***off-chain*** solution.

+ ***Off-chain transactions:*** are processed `outside` the Blockchain network that involves to ***third-parties*** (or layer-2 solutions). Participants transfer their transactions in *a channel* which a third party defined and assigned terms and conditions. It speeds up the transaction and reduces the fees.

    + **Note:** `State Channels` are useful for micro-payments where two parties are constantly sending payments back and forth [2].

##### 3. Privacy and Confidentiality 

\- In addition to watching video, you can read up this problem in the link [2]. I can summary some key solutions to this problem: 

+ ***Privacy***: 

    + Zero Knowledge Proofs: obscure the addresses of the sender and recipient plus the value amount being transferred.

    + Off-chain

    + Encryption

+ ***Confidentiality***: 

    + Lightstreams platform: only a reference address of a state changing message in the ***secure vault*** is broadcasted instead of any smart contract's state changes.  

##### 4. Escrow and Multi-signature feature

\- **Escrow** is an agreement in which assets are held and distributed when conditions are met.

\- **Multi-sig:** A transaction has to be authorized by multiple signatures.


### Reference

[1. The difference between off-chain and on-chain transactions](https://www.cnbctv18.com/cryptocurrency/the-difference-between-off-chain-and-on-chain-transactions-13890012.htm)

[2. Smart contract: Privacy and Confidentiality](https://hackernoon.com/smart-contracts-privacy-vs-confidentiality-645b6e9c6e5a)
