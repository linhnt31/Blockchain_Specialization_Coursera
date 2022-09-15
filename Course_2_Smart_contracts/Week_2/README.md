## Welcome to week 2

___

\- In this week, I highly recommend you to go to [https://cryptozombies.io/](https://cryptozombies.io/en/course) to learn Solidity. 

### 1. Some notes about Solidity language that I learned and used from [https://cryptozombies.io](https://cryptozombies.io/en/course) website

##### 1.1. State Variables & Integers

\- **State variables** are permanently stored in contract storage. This means they're written to the Ethereum blockchain.

##### 1.2. Structs

\- Sometimes you need a more complex data type that have multiple properties..

```solidity
struct Person {
  uint age;
  string name;
  bool isOld;
}
```

##### 1.3.Arrays

\- There are two types of arrays in Solidity: **fixed** arrays and **dynamic** arrays

``` Solidity
// Array with a fixed length of 2 elements:
string[2] fixedArray;

// a dynamic Array - has no fixed size, can keep growing:
uint[] dynamicArray;
```

\- We can declare an array as ***public***, and Solidity will automatically create a ***getter method*** for it.

+ Other contracts would then be able to **read** from, but **not write** to, this array

```solidity
struct Zombie {
    string name;
    uint dna;
}

Zombie[] public zombies;
```

##### 1.4. Function 

\- **Reference types:** when we pass a variable to a function, if our function changes the value of the variable it receives, the value of the original variable gets changed.

+ For example: arrays, structs, mappings, and strings.

+ This kind of variable is required to store in **memory**.

```solidity
function createZombie(string memory _name, uint _dna) public {
    zombies.push(Zombie(_name, _dna));
}
```

\- In Solidity, functions are **public** by default.

\- We should start **private** function with an underscore. 

```solidity
function _createZombie(string memory _name, uint _dna) private {
    zombies.push(Zombie(_name, _dna));
}
```

\- **view** function it's only viewing the data but ***not modifying*** it.

+ **pure** function: we're not reading accessing the state of the the app. 

```solidity
function _generateRandomDna(string memory _str) private view returns (uint) {
    uint rand = uint(keccak256(abi.encodePacked(_str)));
    return rand % dnaModulus;
}
```
##### 1.5. Events

\- **Events** are a way for contracts to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.

```solidity
// When a new zombie is created, the NewZombie event is fired
event NewZombie(uint zombieId, string name, uint dna);

function _createZombie(string memory _name, uint _dna) private {
    zombies.push(Zombie(_name, _dna));
    // and fire it here
    uint id = zombies.push() - 1;
    emit NewZombie(id, _name, _dna);
}
```

##### 1.6. Mappings and Addresses

\- Each account in Ethereum has an address that is unique.

\- **Mappings** is another way of storing organized data like structs and arrays. 

+ A pair of key-value

```solidity
//key: unit and value: address
mapping (uint => address) public zombieToOwner;
```

##### 1.7. Global variables 

\- **msg.sender:** refers to the ***address*** of the person or a smart contract who invoked the current function.  

```solidity
mapping (uint => address) public zombieToOwner;
mapping (address => uint) ownerZombieCount;

function _createZombie(string memory _name, uint _dna) private {
    uint id = zombies.push(Zombie(_name, _dna)) - 1;
    zombieToOwner[id] = msg.sender;
    ownerZombieCount[msg.sender]++;
    emit NewZombie(id, _name, _dna);
}
```

##### 1.8. Conditions 

\- To compare conditions, we can use **require()** function

```solidity
// If the condition returns true, it will continue to execute the following code. 
require(ownerZombieCount[msg.sender] == 0);
```

##### 1.9. Storage and Memory

\- **Storage:** variables stored ***permanently*** on the blockchain

\- **Memory:** variables stored ***temporarily*** on the blockchain

##### 1.10. Function visibility

\- In addition to **public** and **private**, Solidity has two more types of visibility for functions: **internal** and **external**.

+ **internal** is similar to **private**, except for it's accessible to contract's internal functions that other contracts inherit. 

+ **external** is the same as **public**, except that these functions can ONLY be called outside the contract 

```solidity
contract Sandwich {
  uint private sandwichesEaten = 0;

  function eat() internal {
    sandwichesEaten++;
  }
}

contract BLT is Sandwich {
  uint private baconSandwichesEaten = 0;

  function eatWithBacon() public returns (string memory) {
    baconSandwichesEaten++;
    // We can call this here because it's internal
    eat();
  }
}
```
##### 1.11. Enums and Time units

\- Enums restrict a variable to have one of only a few predefined values.

```solidity
contract test {
   enum FreshJuiceSize{ SMALL, MEDIUM, LARGE }
   FreshJuiceSize choice;
   FreshJuiceSize constant defaultChoice = FreshJuiceSize.MEDIUM;
}
```

\- To solve **Ballotv2** problem, we need to read docs about [***Time units***](https://docs.soliditylang.org/en/v0.4.21/units-and-global-variables.html).

##### 1.12. Modifier 

\- Modifiers are used to modify the behavior of a function code that can be run before and / or after a function call.

\- Modifiers can be used to:

+ Restrict access

+ Validate inputs

\- Here is an example about modifiers from [https://solidity-by-example.org/function-modifier/](https://solidity-by-example.org/function-modifier/)

``` Solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract FunctionModifier {
    // We will use these variables to demonstrate how to use
    // modifiers.
    address public owner;
    uint public x = 10;
    bool public locked;

    constructor() {
        // Set the transaction sender as the owner of the contract.
        owner = msg.sender;
    }

    // Modifier to check that the caller is the owner of
    // the contract.
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        // Underscore is a special character only used inside
        // a function modifier and it tells Solidity to
        // execute the rest of the code.
        _;
    }

    // Modifiers can take inputs. This modifier checks that the
    // address passed in is not the zero address.
    modifier validAddress(address _addr) {
        require(_addr != address(0), "Not valid address");
        _;
    }

    function changeOwner(address _newOwner) public onlyOwner validAddress(_newOwner) {
        owner = _newOwner;
    }

    // Modifiers can be called before and / or after a function.
    // This modifier prevents a function from being called while
    // it is still executing.
    modifier noReentrancy() {
        require(!locked, "No reentrancy");

        locked = true;
        _;
        locked = false;
    }

    function decrement(uint i) public noReentrancy {
        x -= i;

        if (i > 1) {
            decrement(i - 1);
        }
    }
}
```
#### 1.13. Interface 

\- A contract wants to talk to another contract on the blockchain that we don't own, as long they expose those functions as **public or external**,first we need to define an **interface**.

\- By including this interface in our dapp's code our contract knows what the other contract's functions look like, how to call them, and what sort of response to expect.

\- Here is an example: 

```solidity
// First contract
contract LuckyNumber {
  mapping(address => uint) numbers;

  function setNum(uint _num) public {
    numbers[msg.sender] = _num;
  }

  function getNum(address _myAddress) public view returns (uint) {
    return numbers[_myAddress];
  }
}

// Second contract
contract NumberInterface {
  function getNum(address _myAddress) public view returns (uint);
}
```