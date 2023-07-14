#### Setting up a private Ethereum blockchain network with Geth [1, 2]

###### 1. Prerequisites

\- Ubuntu: 18.04

\- Geth (go-ethereum): Geth version 1.12.0-stable-e501b3b0

###### 1. Background knowledge

\- **What is geth?** [Geth is an Ethereum execution client meaning it handles transactions, deployment and execution of smart contracts and contains an embedded computer known as the Ethereum Virtual Machine](https://geth.ethereum.org/).

\- Every blockchain starts with ***a genesis block***. The genesis block is configured using a `genesis.json` file whose path must be provided to Geth on start-up. When creating a genesis block, there are key initial parameters for the private blockchain need to be defined:

\- **Bootnode:**

+ When a new node joins the Ethereum network it needs to connect to nodes that are ***already on the network*** in order to then discover new peers. These ***entry points*** into the Ethereum network are called **bootnodes** [3].

+ Simply, a **bootnode** helps new nodes join the Ethereum network. 

> ***Bootnodes*** must be identified by an ***enode***. Enodes are derived from *private key*.

###### 2. Tutorial for creating a private Ethereum blockchain network

\- First, create two main directories: 

```python
blockfed@ubuntu:~/Desktop$ mkdir private_blockchain && cd private_blockchain && mkdir node1 node2
```

\- Then, we create accounts (i.e., two paris of public/private keys): 

```python
blockfed@ubuntu:~/Desktop/private_blockchain$ geth --datadir node1/ account new
blockfed@ubuntu:~/Desktop/private_blockchain$ geth --datadir node2/ account new
```

\- We need to create a genesis file to configure our network. The content of the `genesis.json` file:

```python
{
  "config": {
    "chainId": 12345,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "istanbulBlock": 0,
    "muirGlacierBlock": 0,
    "berlinBlock": 0,
    "londonBlock": 0,
    "arrowGlacierBlock": 0,
    "grayGlacierBlock": 0,
    "clique": {
      "period": 5,
      "epoch": 30000
    }
  },
  "difficulty": "1",
  "gasLimit": "800000000",
  "extradata": "0x00000000000000000000000000000000000000000000000000000000000000007df9a875a174b3bc565e6424a0050ebc1b2d1d820000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "alloc": {
    "ce6401192284633206eb4c747e2e2e8836418e5a": { "balance": "500000" },
    "6c4e27266e7eedb77d8d78f61f4db58435da99e2": { "balance": "500000" },
    "27f3b76638c6003c9a32bfd0b9ec89c07c2fdd1a": { "balance": "500000" }
  }
}
```

Where 

+ **eip150Block**, **eip155Block**, and **eip158Block**: your chain won't be hard-forking for these changes, so leave as 0.

+ [**period**](https://docs.klaytn.foundation/content/installation-guide/deployment/service-chain/references/genesis): The minimum time interval between the consecutive blocks

+ **epoch**: The number of blocks to reset votes and marked as a checkpoint
  
+ **homesteadBlock**: our chain won't be undergoing the switch to Homestead, so leave this as 0.

+ **gasLimit**: A scalar value equal to the current chain-wide limit of Gas expenditure per block. 

\- The nodes can now be set up using `geth init` as follows:

```python
blockfed@ubuntu:~/Desktop/private_blockchain$ geth init --datadir node1 genesis.json
INFO [07-14|01:34:42.373] Maximum peer count                       ETH=50 LES=0 total=50
INFO [07-14|01:34:42.376] Smartcard socket not found, disabling    err="stat /run/pcscd/pcscd.comm: no such file or directory"
INFO [07-14|01:34:42.380] Set global gas cap                       cap=50,000,000
INFO [07-14|01:34:42.380] Initializing the KZG library             backend=gokzg
INFO [07-14|01:34:42.454] Defaulting to pebble as the backing database 
INFO [07-14|01:34:42.454] Allocated cache and file handles         database=/home/blockfed/Desktop/private_blockchain/node1/geth/chaindata cache=16.00MiB handles=16
INFO [07-14|01:34:42.472] Opened ancient database                  database=/home/blockfed/Desktop/private_blockchain/node1/geth/chaindata/ancient/chain readonly=false
INFO [07-14|01:34:42.472] Writing custom genesis block 
INFO [07-14|01:34:42.473] Persisted trie from memory database      nodes=4 size=573.00B time="17.746µs" gcnodes=0 gcsize=0.00B gctime=0s livenodes=0 livesize=0.00B
INFO [07-14|01:34:42.473] Freezer shutting down 
INFO [07-14|01:34:42.474] Successfully wrote genesis state         database=chaindata hash=fe54df..bcf74c
INFO [07-14|01:34:42.474] Defaulting to pebble as the backing database 
INFO [07-14|01:34:42.474] Allocated cache and file handles         database=/home/blockfed/Desktop/private_blockchain/node1/geth/lightchaindata cache=16.00MiB handles=16
INFO [07-14|01:34:42.488] Opened ancient database                  database=/home/blockfed/Desktop/private_blockchain/node1/geth/lightchaindata/ancient/chain readonly=false
INFO [07-14|01:34:42.488] Writing custom genesis block 
INFO [07-14|01:34:42.491] Persisted trie from memory database      nodes=4 size=573.00B time="33.564µs" gcnodes=0 gcsize=0.00B gctime=0s livenodes=0 livesize=0.00B
INFO [07-14|01:34:42.492] Successfully wrote genesis state         database=lightchaindata hash=fe54df..bcf74c
```

\- Configure a **bootnode** using *bootnode tool*:

```python
blockfed@ubuntu:~/Desktop/private_blockchain$ bootnode -genkey boot.key
blockfed@ubuntu:~/Desktop/private_blockchain$ ls
boot.key  genesis.json  node1  node2  node3
blockfed@ubuntu:~/Desktop/private_blockchain$ bootnode -nodekey boot.key -addr :30306
enode://97acf9e24df143d0ee064e1fdf02a1815071e94c24883de8c5cecb4c49629a0de0dde96c30a0d17c19ba62d037adf80df048f39db2b5fd0e69ff18a3771333e4@127.0.0.1:0?discport=30306
Note: you're using cmd/bootnode, a developer tool.
We recommend using a regular node as bootstrap node for production deployments.
INFO [07-14|01:42:46.434] New local node record                    seq=1,689,324,166,428 id=f1b7449a192092c8 ip=<nil> udp=0 tcp=0
```

\- Open separate terminals for three nodes, i.e., node1, and node2, leaving the bootnode running in the original terminal.

```python
blockfed@ubuntu:~/Desktop/private_blockchain$ geth --datadir node1 --port 30307 --bootnodes enode://97acf9e24df143d0ee064e1fdf02a1815071e94c24883de8c5cecb4c49629a0de0dde96c30a0d17c19ba62d037adf80df048f39db2b5fd0e69ff18a3771333e4@127.0.0.1:0?discport=30306  --networkid 12345 --unlock ce6401192284633206eb4c747e2e2e8836418e5a --password node1/password.txt --authrpc.port 8551
blockfed@ubuntu:~/Desktop/private_blockchain$ geth --datadir node2 --port 30308 --bootnodes enode://97acf9e24df143d0ee064e1fdf02a1815071e94c24883de8c5cecb4c49629a0de0dde96c30a0d17c19ba62d037adf80df048f39db2b5fd0e69ff18a3771333e4@127.0.0.1:0?discport=30306  --networkid 12345 --unlock 6c4e27266e7eedb77d8d78f61f4db58435da99e2 --password node2/password.txt --authrpc.port 8552
```

\- Now, we already have 2 active nodes. We can attach a Javascript console to either node to query the network properties:

```python
me to the Geth JavaScript console!

instance: Geth/v1.12.0-stable-e501b3b0/linux-amd64/go1.20.3
at block: 0 (Wed Dec 31 1969 16:00:00 GMT-0800 (PST))
 datadir: /home/blockfed/Desktop/private_blockchain/node1
 modules: admin:1.0 clique:1.0 debug:1.0 engine:1.0 eth:1.0 miner:1.0 net:1.0 rpc:1.0 txpool:1.0 web3:1.0

To exit, press ctrl-d or type exit
> net.peerCount
1
> net.
net._requestManager net.constructor net.getListening net.getPeerCount net.getVersion net.listening net.peerCount net.version 
> admin.
admin.__proto__            admin.datadir              admin.hasOwnProperty       admin.propertyIsEnumerable admin.startHTTP            admin.stopWS               
admin.addPeer              admin.exportChain          admin.importChain          admin.removePeer           admin.startRPC             admin.toLocaleString       
admin.addTrustedPeer       admin.getDatadir           admin.isPrototypeOf        admin.removeTrustedPeer    admin.startWS              admin.toString             
admin.clearHistory         admin.getNodeInfo          admin.nodeInfo             admin.sleep                admin.stopHTTP             admin.valueOf              
admin.constructor          admin.getPeers             admin.peers                admin.sleepBlocks          admin.stopRPC              
> admin.peers
[{
    caps: ["eth/66", "eth/67", "eth/68", "snap/1"],
    enode: "enode://da2fef191772fb35e461ec5aff4f0e6557bb450968bef39a449129f848f0f0d84e43e467814f683c0c8fbf1896248c457d820d16ab8a3314561e8c21f9cfd9ac@127.0.0.1:37898",
    id: "cbd7766afa2f7211d85da892920496bc56a3a6895bc49ec0bbaeba8584345738",
    name: "Geth/v1.12.0-stable-e501b3b0/linux-amd64/go1.20.3",
    network: {
      inbound: true,
      localAddress: "127.0.0.1:30307",
      remoteAddress: "127.0.0.1:37898",
      static: false,
      trusted: false
    },
    protocols: {
      eth: {
        version: 68
      },
      snap: {
        version: 1
      }
    }
}]
> 
```
#### References

[[1]. Private Networks](https://geth.ethereum.org/docs/fundamentals/private-network)

[[2]. Setup Your Private Ethereum Network With Geth](https://www.c-sharpcorner.com/article/setup-your-private-ethereum-network-with-geth2/)

[[3]. INTRODUCTION TO ETHEREUM BOOTNODES](https://ethereum.org/en/developers/docs/nodes-and-clients/bootnodes/#:~:text=When%20a%20new%20node%20joins,of%20bootnodes%20hardcoded%20into%20them.) 

[[4]. What does each genesis.json parameter mean?](https://ethereum.stackexchange.com/questions/2376/what-does-each-genesis-json-parameter-mean)
