## Welcome to week 3

___

#### 1. Solidity features

\- All changes in Blockchain are saved as **state**. Besides, we have a ton of data and nodes on Blockchain need to have a copy of them, so we pay attention to efficient storage in each node. In solidity,

+ **memory:** as its name, it refers to a temporary storage in RAM.

+ **storage:** is a persistent storage between function calls. Type of variable is assigned to a local array inside a function by default.

\- What happened if our smart contracts are outdated? First, recall features of a smart contract has, we will see how to deal with it: 

+ An address

+ Has an owner (creator)

+ Has a balance 

+ Ownership may be changed or deleted **[v]**

#### 2. Event handling

\- **Events:** push notifications and log activities for completion a task within a smart contract and the Blockchain.

#### 3. Oraclize or Provable 

\- Allow a smart contract accessing external resources. Or, **Oraclize** is a data carrier between web resources (APIs, URLs) and a smart contract. 

|![](https://programmerclick.com/images/376/41fc79b8dbf1c72cc096ace820297b40.png)
:---:
|*Fid 1. How Oraclize works*|