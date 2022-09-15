## Welcome to week 1

___

#### 1. Blockchain Server

\- The term **Blockchain server** represents the whole infrastructure and functionality of a Blockchain system.

|![](./Images/Dapp_stack.jpg)|
:---:
|*Fig 1. Dapp stack*|

\- Next, we will create a private Ethereum network using Geth client.

```shell
# Each instance has a separate data directory 
linhnt@viendanbac:~/Desktop$ geth --datadir ./Blockchain_course account new # Create an EOA
linhnt@viendanbac:~/Desktop$ geth --datadir ./data init genesisBlock.json # Create the first block, named genesis block
linhnt@viendanbac:~/Desktop$ geth --datadir ./data --networkid 15 --maxpeers 20 --port 30303 console

# Get enode URL Used by other nodes to connect and form a p2p network
> admin.nodeInfo.enode 
"enode://4be4409e82ce59cc51b7385398c5ffe93994b294cd26b5bdd059a020c9a28b631000860f8abf0522dff3acef6c63844c0f99e471ce200e843ce3d08444ecc7dc@117.6.94.96:30303?discport=50346"

# Add a new node
> admin.addPeer("enode://4be4409e82ce59cc51b7385398c5ffe93994b294cd26b5bdd059a020c9a28b631000860f8abf0522dff3acef6c63844c0f99e471ce200e843ce3d08444ecc7dc@117.6.94.96:30303?discport=50346")
true

# Test the connection
> net.listening
true
> net.peerCount 
2
```

#### 2. Dapp defined

\- The frontend of Dapps uses the same technologies like traditional Web application. 

+ It contains the **wallet** that manages ***private keys*** and the ***blockchain address***. 

+ To connect to Blockchain, it triggers smart contracts **[Frontend => Smart contract => Blockchain]**.

#### 3. Ethereum APIs

\- There are two categories of Ethereum API: 

+ **Management APIs:** admin, miner,...

+ **Web3 APIs:** web3, eth, net,...

\- **NOTE:**

+ For any geth node to join a network there are 2 requirement one is to **have the same genesis block** and other is to **have the same networkid**. Once these requirements are satisfied, to join a network you have to know the **enodeid** of the nodes you want to connect to. [Answer by joifsi](https://ethereum.stackexchange.com/questions/17051/how-to-select-a-network-id-or-is-there-a-list-of-network-ids)