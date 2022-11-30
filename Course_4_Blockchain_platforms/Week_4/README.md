### Alternative Decentralized Solutions

___

##### 1. Interplanetary File System (IPFS)

\- **IPFS** is a decentralized file sharing or **content-based** sharing file system. 

|![](https://ars.els-cdn.com/content/image/1-s2.0-S0167739X19323003-gr1.jpg)|
|:---:|
|*Fig 1. IPFS architecture [1]*|

\- To identify the location of files, **IPFS** use `hash of file's content` instead of *file's location (URL)* like HTTP/HTTPS.

\- **IPFS** can work in tandem with Blockchain when they can store *the volume/data*, its metadata can be stored in DLT. 

|![](https://www.researchgate.net/profile/Nadeem-Javaid/publication/337712447/figure/fig1/AS:834500409974784@1575971810081/Data-sharing-on-IPFS-by-owner.png)|
|:---:|
|*Fig 2. IPFS and data sharing [2]*| 

- I do not why this image couldn't display, you can refer it via its link in my README.md file

+ In IPFS, there is the `distributed hash table` (DHT) for routing which contains locations of nodes and file objects. 

+ Peer nodes want to exchange blocks of file using **bitswap protocol** (communicating between nodes, incentivize sending blocks, load balancers,...).

+ Multiple versions of a file is managed by *Merkle DAG* to check any tampering and avoid file duplication.

##### 2. Hashgraph

\- **Hashgraph** provides a consensus layer that orders the transactions with low latency and minimal power consumption.

### References

[1. Delegated content erasure in IPFS - ScienceDirect](https://www.sciencedirect.com/science/article/pii/S0167739X19323003)

[2. Data sharing and IPFS](https://www.researchgate.net/figure/Data-sharing-on-IPFS-by-owner_fig1_337712447)
