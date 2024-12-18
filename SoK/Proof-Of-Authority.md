### 1. What is Proof of Authority (PoA)?

\- `PoA` is a reputation-based consensus algorithm and is often used in the private and consortium blockchain network [[0]](https://github.com/ibrahimmashaly/geth-poa-tutorial). Instead of using resource-intensive miners, PoA has authority nodes, named **signers** or **sealers**. 

  + The number of *authority nodes* is often small. They are manually chosen by the blockchain network owner leading to a less degree of decentralization but providing high throughput and high scalability. 

\- **Clique** is a native PoA protocol in Geth. **Clique** has key features as follows:

+ Any signer can only produce/broadcast a certain number of consecutive blocks.

$$CONSECUTIVE\\_BLOCK\\_LIMIT = {NUMBER\\_OF\\_TOTAL\\_SIGNERS \over 2} + 1$$

+ Will be updated soon!
  
### 2. Explain the PoA genesis file [1-3]

\- Here, we have a sample file of `PoA genesis.json`:

```json
{
  "config": {
    "chainId": 123456,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "clique": {
      "period": 1,
      "epoch": 30000
    }
  },
  "coinbase": "0x0000000000000000000000000000000000000000",
  "difficulty": "0x20000",
  "extraData": "",
  "gasLimit": "0x8000000",
  "alloc": {}
    "0xef142e9C6e50Dcf116fcB2AC333864f1EFC0616B": {
      "balance": "1000000000000000000000"
    }
}
```

Where

+ **chainId**: prevents ***the replay attack***.

+ **homesteadBlock**: [`Homestead`](https://github.com/ethereum/homestead-guide/blob/master/source/introduction/the-homestead-release.rst) is the second major release of Ethereum while the first release is `Frontier`. The value 0 means that you are using this release.

+ **epi15xBlock** (where *x* might be values like 0, 5, or 8):

  + **epi150Block**: [Gas cost changes for IO-heavy operations](https://eips.ethereum.org/EIPS/eip-150)
 
  + **epi155Block**: [Simple replay attack protection](https://eips.ethereum.org/EIPS/eip-155)
 
  + **epi158Block**: [State clearing](https://eips.ethereum.org/EIPS/eip-158)
 
  + [Our chain won't be hard-forking for these changes, so leave as 0](https://ethereum.stackexchange.com/questions/15682/the-meaning-specification-of-config-in-genesis-json?newreg=531e22562301481f96f0d576f56b7192).

+ [**clique**](https://docs.klaytn.foundation/content/installation-guide/deployment/service-chain/references/genesis#clique): stores the configuration for Proof-Of-Authority (POA) based sealing.

  + **period**: The minimum time interval between the consecutive blocks (unit: second).
 
  + **epoch**: The number of blocks to reset votes and marked as a checkpoint.
    
+ **coinbase**: it is a 40 digits hex ethereum address (160 bit, one hex digit is 4 bit) where all rewards collected from the successful block validation will be transferred. A reward is a sum of the mining reward and the refunds from executing contract transactions. *Since it’s a genesis block, the value for this block can be anything*. For all the next blocks the value will be an address set by the miner who validated that block.
  
+ **difficulty**: mining difficulty  #set this value low so you don’t have to wait too long for mining blocks

+ **extraData**: includes *32 zero bytes*, *all signer addresses* and *65 further zero bytes*. Also, it’s an optional param that can’t be bigger than 32 bytes.

  + For example: **extraData** contains a single initial signer address, 0x7df9a875a174b3bc565e6424a0050ebc1b2d1d82.
 
    ```json
    "extradata": "0x00000000000000000000000000000000000000000000000000000000000000007df9a875a174b3bc565e6424a0050ebc1b2d1d820000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    ```
  
+ **gasLimit**: the limit of *gas cost per block* #set this value high to avoid being limited when testing

+ **alloc**: pre-funded address. The address is a 40 digits hex string (160 bit, one hex digit is 4 bit)


> Relevant article: [Setting up a private Ethereum blockchain network with Geth and Learning relevant concepts](https://github.com/linhnt31/Blockchain_Specialization_Coursera/blob/master/Concepts_and_Exploration/Setting_up_private_blockchain_network_with_geth.md)

### Refereces

[[1]. Beginners guide to Ethereum (3) — explain the genesis file and use it to customize your blockchain](https://medium.com/taipei-ethereum-meetup/beginners-guide-to-ethereum-3-explain-the-genesis-file-and-use-it-to-customize-your-blockchain-552eb6265145)

[[2]. Params in Ethereum Genesis Block Explained](https://www.asynclabs.co/blog/blockchain-development/params-in-ethereum-genesis-block-explained/)

[[3]. Explaining the Genesis Block in Ethereum](https://arvanaghi.com/blog/explaining-the-genesis-block-in-ethereum/)
