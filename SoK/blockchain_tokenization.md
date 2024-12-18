# Blockchain-enabled Tokenization

---

### 1. Definition

\- In the blockchain domain, tokenization refers to a ***process*** of transforming physical/virtual assets (e.g., real estate, artwork, commodities, or game items) into ***digital tokens***, which then stored in the blockchain platforms in the immutable and transparent manners [1,2]. ***Digital tokens*** here are just a piece of information, what describes what tokens mapping to [3]. 


### 2. Classification

\- First, digital objects (including digital tokens) can be categorized into two types of tangibility and fungibility [4]. Specifically, the tangibility of an asset indicates the existence/presence of that asset, which can be <ins>tangible</ins> (e.g., real estate) or <ins>intangible</ins> (e.g., rights or services). Meanwhile, the fungibility of an asset refers **exchangeability** (<ins>fungible</ins>) and **uniqueness** (<ins>non-fungible</ins>). 

\- From the fungibility perspective, we can categorize digital tokens into three main types:

+ Fungible Tokens: are <ins>interchangeable</ins> and <ins>dividable</ins> assets and are equivalent to other tokens within the same category, especially are not unique. Popularly, these tokens follow the [ERC-20 standard](https://eips.ethereum.org/EIPS/eip-20) in the Ethereum ecosystem. However, there are several kinds of assets that cannot be divided such as artwork or real estate, we need another kind of tokens to handle this to ensure uniqueness and ownership and copyright protection. 

+ Non-Fungible Tokens (NFTs): are <ins>unique</ins> and <ins>indivisible</ins>, that are applicable to industries of arts and intellectual property. The most popular standard for NFTs is [ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/) [5].

+ Hybrid Tokens: are combination of fungible tokens and NFTs, inheriting characteristics of both.

### 3. How it works

\- For example, with fungible tokens in Ethereum ecosystems, any smart contract follows the [ERC-20 standard](https://eips.ethereum.org/EIPS/eip-20) will be an ERC-20 token. Here is an example for ERC-20 implementation [6]:

```Solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount)
        external
        returns (bool);
    function allowance(address owner, address spender)
        external
        view
        returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount)
        external
        returns (bool);
}

contract ERC20 is IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner, address indexed spender, uint256 value
    );

    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    string public name;
    string public symbol;
    uint8 public decimals;

    constructor(string memory _name, string memory _symbol, uint8 _decimals) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
    }

    function transfer(address recipient, uint256 amount)
        external
        returns (bool)
    {
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount)
        external
        returns (bool)
    {
        allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    function _mint(address to, uint256 amount) internal {
        balanceOf[to] += amount;
        totalSupply += amount;
        emit Transfer(address(0), to, amount);
    }

    function _burn(address from, uint256 amount) internal {
        balanceOf[from] -= amount;
        totalSupply -= amount;
        emit Transfer(from, address(0), amount);
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external {
        _burn(from, amount);
    }
}
```



### Reference

[1]. Q. Wang, R. Li, Q. Wang, S. Chen, M. Ryan, and T. Hardjono, “Exploring Web3 from the view of blockchain,” arXiv preprint arXiv:2206.08821, 2022.

[2]. H. Chen, H. Duan, M. Abdallah, Y. Zhu, Y. Wen, A. E. Saddik, and W. Cai, “Web3 metaverse: State-of-the-art and vision,” ACM Trans- actions on Multimedia Computing, Communications and Applications (TOMM), vol. 20, no. 4, pp. 1–42, 2023.

[3]. G. Wang and M. Nixon, “SoK: Tokenization on blockchain,” in IEEE/ACM International Conference on Utility and Cloud Computing Companion, pp. 1–9, 2021.

[4]. B. Pillai, K. Biswas, and V. Muthukkumarasamy, “Blockchain interoperable digital objects,” in International Conference on Blockchain, pp. 80–94, 2019.

[5]. Non-Fungible Tokens (NFTs)—Survey of Current Applications, Evolution, and Future Directions

[6]. https://www.cyfrin.io/glossary/erc-20-solidity-code-example