## Reproducing Pet Shop Project

___

After completing week 2 of course 2 - Decentralized applications, I am attracted the way we deploy a Dapp with Truffle, Ganache, JS, Solidity and Metamask. Therefor, for deep understanding, I will continue to practice by following the instruction in [1] and add more features I like to this project. Let's get started!

#### 1. Prerequisites

\- You should have fundamental knowledge about Ethereum, Solidity, Javascript, Truffle, Ganache. 

\- To avoid undesirable errors, I highly recommend you use the same versions of packages and softwares below: 

+ **OS:** Ubuntu 18.04 LTS

+ **NodeJS:** v16.14.2

+ **Truffle:** v5.5.10

+ **Ganache CLI:** v6.12.2 (ganache-core: 2.13.2)

+ **Web3:** v1.7.3

#### 2. Background

#### 3. Dive into Pet Shop project

##### 3.1. Creating project directory

\- First, we need a parent directory to store necessary files and folders for our project: 

```shell
linhnt@viendanbac:~/Desktop$ mkdir petShop
linhnt@viendanbac:~/Desktop$ cd petShop/
```

\- In the week 2 course 2, we conduct building basis Truffle project from scratch by using `Truffle init`, but in this project, we inherit from **pet-shop** box that contains pre-defined libraries, contracts,... 

```bash
linhnt@viendanbac:~/Desktop/petShop$ truffle unbox pet-shop
linhnt@viendanbac:~/Desktop/petShop$ ls
box-img-lg.png  box-img-sm.png  bs-config.json  contracts  LICENSE  migrations  node_modules  package.json  package-lock.json  src  test  truffle-config.js
```

##### 3.2. Writing smart contract

\- All the content of smart contract is put into **./contracts/Adoption.sol**.

\- Next, we need to convert Solidity code into bytecode to EVM can execute by `truffle compile`. It will create artifacts (.json files) stored in **build/**.

```bash
linhnt@viendanbac:~/Desktop/petShop$ truffle compile

Compiling your contracts...
===========================
> Compiling ./contracts/Adoption.sol
> Compiling ./contracts/Migrations.sol
> Artifacts written to /home/linhnt/Desktop/petShop/build/contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang
linhnt@viendanbac:~/Desktop/petShop$ ls
box-img-lg.png  box-img-sm.png  bs-config.json  build  contracts  LICENSE  migrations  node_modules  package.json  package-lock.json  src  test  truffle-config.js
linhnt@viendanbac:~/Desktop/petShop$ cd build/
linhnt@viendanbac:~/Desktop/petShop/build$ ls
contracts
linhnt@viendanbac:~/Desktop/petShop/build$ cd contracts/
linhnt@viendanbac:~/Desktop/petShop/build/contracts$ ls
Adoption.json  Migrations.json
```
##### 3.3. Deploying our contracts

\- Now, we focus on **migrations/** directory that contains **.js** files to deploy our contracts to the chain.

+ `1_initial_migration.js:` This handles deploying the **Migrations.sol** contract to observe subsequent smart contract migrations, and ensures *we don't **double-migrate unchanged contracts** in the future*.

+ `2_deploy_contracts.js:` This file is added to deploy complement contract, namely **Adoption.sol**.

    ```javascript
    var Adoption = artifacts.require("Adoption");
        
    module.exports = function(deployer) {
    deployer.deploy(Adoption);
    };
    ```
\- In this tutorial, we use a personal Ethereum Blockchain by using **ganache-cli** tool. It is going to create 10 fake accounts with 100 Eth each.

```shell
linhnt@viendanbac:~/Desktop/petShop$ node_modules/.bin/ganache-cli 
Ganache CLI v6.12.2 (ganache-core: 2.13.2)

Available Accounts
==================
(0) 0x3389bE83119386b9cf8722902ea26085eBAD9026 (100 ETH)
(1) 0x0555e1451B7A4E8257d8953682297e72970cb38a (100 ETH)
(2) 0x8cBAb073727d659FF1B78D76D9C12b38d355e681 (100 ETH)
(3) 0x16d4dE38DF08f47370E100D23672e030129766cf (100 ETH)
(4) 0x11367246F6A1e9b8b9Fe6F80Bf51f5b0994620C5 (100 ETH)
(5) 0x37826AC7F7076e3a554359175Df0bdE27310Cb50 (100 ETH)
(6) 0xc2bbaE0eD3776A943fF2dC09dEb349c24Fa3E9db (100 ETH)
(7) 0xB18BE676272078821EFC64Ad2c603174E6CDe8d2 (100 ETH)
(8) 0x3F7235c81657dAA78FBBf8a75AB5A878f336ac40 (100 ETH)
(9) 0x4cCCe4a887bb8691683635e2AAA4341B7902be9A (100 ETH)

Private Keys
==================
(0) 0xd148cfe168bff88a837d6adbaa255eba42e3be1a086d7034ad3d31396abc750a
(1) 0x37cd095eca0d0fead58754fd8d9956ac3c3f36754812d0a0a04a52d8911f7666
(2) 0x3802af977f63ad0310c44bb4e46e68c5e4653014720ba32e1ecde55f89a6b73c
(3) 0xcec64942fc10233fe0627fc1be6134c90dcf51b650c48035533b6f0bd2ae1a7d
(4) 0x97e6d4a33f60c4dfa79c82218794af32068da48f5bbb882df69e6fd9ab8fac3e
(5) 0x50b8e25f018ce84645ea6e5779eae9f8d1b0f0cf923de606873e82e8ddc8e5b1
(6) 0x847ed135798bae28f03ddac60cd48e6024334ed5ec73ae81fdb5e04abc7e6c4f
(7) 0xcbc025966cc03fd6d0c62dea5e6bdd5c623202899b7ad238170a908f3ffdaf25
(8) 0x58bd968298ba22b777aefed47190c834c52ec41af72c8ec6c194f2be0b8da206
(9) 0x3da2a5018045f1116f95157244e49df4c16355a6f3eb7c53d6d2f93620347027

HD Wallet
==================
Mnemonic:      clutch cradle wing capable impulse march menu artefact hazard nothing source vehicle
Base HD Path:  m/44'/60'/0'/0/{account_index}

Gas Price
==================
20000000000

Gas Limit
==================
6721975

Call Gas Limit
==================
9007199254740991

Listening on 127.0.0.1:8545
```

+ **Gas Limit** - the maximum amount of gas that you’re willing to pay to run a transaction. (**units**)

+ **Gas Price** - the amount you want to pay per unit of gas as a fee to the miner. (**wei**)

+ **Total fee** = **Gas Limit** x **Gas Price**

+ 1 Eth = 1 gwei = ${10^9}$ wei

\- We are able to migrate our contracts to the Blockchain now.

+ **NOTE:** As the Blockchain network is listening on port 8545, we need to change the port in **truffle-config.js** file to 8545.

```shell
linhnt@viendanbac:~/Desktop/petShop$ truffle migrate

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


Starting migrations...
======================
> Network name:    'development'
> Network id:      1650621774258
> Block gas limit: 6721975 (0x6691b7)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xd41ba2c69be2ec40cebc95df45a2fc5420e663e5f19087cb1d855309f93c30b4
   > Blocks: 0            Seconds: 0
   > contract address:    0x45e52e8361fE7B7c26CdfEd829B833226Df290E4
   > block number:        1
   > block timestamp:     1650621793
   > account:             0x3389bE83119386b9cf8722902ea26085eBAD9026
   > balance:             99.99616114
   > gas used:            191943 (0x2edc7)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00383886 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00383886 ETH


2_deploy_contracts.js
=====================

   Deploying 'Adoption'
   --------------------
   > transaction hash:    0xb23bd774c6a9c8af41406bf6d41bf15e4970371693afd228aae0abce48d3ca51
   > Blocks: 0            Seconds: 0
   > contract address:    0x93c6D59D101D4Abc8C6a640950Ea37Da21490D96
   > block number:        3
   > block timestamp:     1650621794
   > account:             0x3389bE83119386b9cf8722902ea26085eBAD9026
   > balance:             99.99123376
   > gas used:            204031 (0x31cff)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00408062 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00408062 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.00791948 ETH
```

\- Well, we successfully deploy our smart contracts to personal Ethereum Blockchain. We can see that the balance of the first account is lower due to the fee of deployment. 

#### 4. Testing the smart contract

\- To know whether our smart contracts works well, we generate a test phase. We create a file, named **TestAdoption.js** in **test/** directory.

```javascript
const Adoption = artifacts.require("Adoption");

contract("Adoption", (accounts) => {
  let adoption;
  let expectedAdopter;

  before(async () => {
      adoption = await Adoption.deployed();
  });

  describe("adopting a pet and retrieving account addresses", async () => {
    before("adopt a pet using accounts[0]", async () => {
      await adoption.adopt(8, { from: accounts[0] });
      expectedAdopter = accounts[0];
    });
  });
  
  it("can fetch the address of an owner by pet id", async () => {
    const adopter = await adoption.adopters(8);
    assert.equal(adopter, expectedAdopter, "The owner of the adopted pet should be the first account.");
  });
  
  it("can fetch the collection of all pet owners' addresses", async () => {
  const adopters = await adoption.getAdopters();
  assert.equal(adopters[8], expectedAdopter, "The owner of the adopted pet should be in the collection.");
  });
});
```

+ **this:** is a contract-wide variable that gets the current contract's address.

\- Back in the terminal, run the tests:

```shell
linhnt@viendanbac:~/Desktop/petShop$ truffle test
```

#### 5. Creating a user interface to interact with the smart contract


## Reference

+ [1. Pet Shop Project](https://trufflesuite.com/tutorial/)