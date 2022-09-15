## Welcome to week 3

___ 

#### 1. Public-key cryptography

\- **Symmetric key cryptography:**

+ The *same key* is used for both ***encryption*** and ***decryption***

|![](https://www.ssl2buy.com/wiki/wp-content/uploads/2015/12/Symmetric-Encryption.png)|
:---:
|*Fig 1. Symmetric cryptography *|

\- **Asymmetric key cryptography, also known as public-key cryptography:**

+ Using the **pair of {private, public}** key

+ Example: RSA, ECC,...

\- A cool video explaining about both two terms: [Public Key Cryptography - Computerphile](https://www.youtube.com/watch?v=GSIDS_lvRv4)

\- I also highly recommend you read this article of Cloudflare and Medium to understand how public-key cryptography works. [Link1](https://www.cloudflare.com/learning/ssl/how-does-public-key-encryption-work/) and [Link2](https://medium.com/@blairlmarshall/how-does-a-bitcoin-transaction-actually-work-1c44818c3996) respectively.

|![](https://bacninhtrade.com.vn/public-key-and-private-key/imager_4_41372_700.jpg)|
:---:
|*Fig 2. Asymmetric cryptography*|

#### 2. Hashing - Compression function

\- **Hashing techniques** *maps* an arbitrary length of input data value to a ***unique fixed length value*** which **can not be reversed** back to the original one. 

+ Hash functions are used for **data integrity** and often in combination with **digital signatures**. 

+ For example: SHA-256 (for Bitcoin), SHA-3, Keccak-256 (for Ethereum)...

|![](https://codelearn.io/Upload/Blog/hash-in-a-nutshell-63729735068.2433.jpg)|
:---:
|*Fig 3. How a hash function works*|

\- **Hashing requirements:**

+ The algorithm should be one-way function 

+ Collision free

\- **Use cases** in Ethereum: hashing is used to generate 

+ Account Address

+ Digital signatures

+ Transaction hash

+ State hash

+ Receipt hash 

+ Block header hash

\- Blockchain takes advantage of hashing, pointer and linked list to create **hash pointer**

+  [A hash pointer is similar to a pointer, but instead of just **containing the address of the previous block** it also contains **the hash of the data inside the previous block**](https://blockgeeks.com/guides/what-is-hashing/).

|![](https://blockgeeks.com/wp-content/uploads/2017/08/image4.png)|
:---:
|*Fig 4. Components of a block header*|

\- `Merkle Tree:` each non-leaf node is the hash of the values of their child nodes.

+ Using a Merkle tree will greatly reduce the time required to find out whether a particular transaction belongs in that block or not because its hierarchical architecture. 

+ Using a Merkle tree when number of items differ from block to block like (Transaction, State, Receipt)

|![](https://upload.wikimedia.org/wikipedia/commons/9/95/Hash_Tree.svg)|
:---:
|*Fig 5. The architecture of a Merkle tree*|

\- **Hashing with mining process:**

+ To add a new block to the blockchain, this new block will be hashed, namely A. 

    + Then, string **Nonce** is concatenated with A, named B
    + And, we continue to hash B, we would have C

+ If C is less than the **difficult level**, the block is added to the blockchain. If not, **Nonce** value will be changed until the requirements are met.

#### 3. Transaction integrity

\- In the lecture, to manage the integrity of transaction, we need:

+ Secure ***account address***: 

    + First, 256-bit random number is used to create a private key (For example, ECDSA)

    + Next, use ECC algorithm applied to private key to generate a public key

    + Finally, hashing on public key to create account address.

+ Authorization the transaction via digital signing 

+ Check the data of transaction is not modified 

    + The receiver gets the **original data** and the secure **hash digitally signed**.

    + Then, receiver can **recompute the hash of the original data received**, and compare it with the received hash to verify the integrity of the document.

#### 4. Securing Blockchain

\- Main components of a Ethereum block: 

+ Block header

|![](https://www.researchgate.net/profile/Ingo-Weber-2/publication/330752524/figure/fig1/AS:720996399063040@1548910345223/Ethereum-block-header-and-state-merkle-tree.png)|
:---:
|*Fig 6. Ethereum block header*|


+ Transaction hash

+ Transaction root

+ State hash

+ State root

\- In Ethereum, **the block hash** is the block of all the elements in the block header, including the transaction root and state root hashes.

\- **NOTE** from [Bitcoin.stackexchange.com](https://bitcoin.stackexchange.com/questions/35448/is-it-chain-of-headers-rather-than-a-chain-of-blocks). Is it chain of headers rather than a chain of blocks?

+ Blocks contain a header, and headers are chained, so blocks are chained also. Merkle root attaches the transactions in the block to the header.

    + Block header contains the hash of previous block header.

|![](https://web.archive.org/web/20191201031454/https://bitcoin.org/img/dev/en-blockchain-overview.svg)|
:---:
|*Fig 7. A chain of blocks*|

