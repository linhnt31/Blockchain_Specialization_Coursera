let Auction = artifacts.require("./Auction.sol");

let auctionInstance;

contract('AuctionContract', function (accounts) {
  //accounts[0] is the default account
  //Test case 1
  it("Contract deployment", function() {
    //Fetching the contract instance of our smart contract
    return Auction.deployed().then(function (instance) {
      //We save the instance in a gDlobal variable and all smart contract functions are called using this
      auctionInstance = instance;
      assert(auctionInstance !== undefined, 'Auction contract should be defined');
    });
  });

  //Sample Test Case
  it("Should set bidders", function() {
    return auctionInstance.register({from:accounts[1]}).then(function(result) {
        return auctionInstance.getPersonDetails(0)
    }).then(function(result) {
      assert.equal(result[2], accounts[1], 'bidder address set');
    })
  });

  //Test Case for checking if the bid is more than the token amount
  it("Should NOT allow to bid more than remaining tokens", function() {
    /**********
    TASK 1:   Call bid method from accounts[1] of Auction.sol using auctionInstance and
    pass itemId=0, count=6 as arguments
    HINT:     To make a function call from account 1 use {from: accounts[1]} as an extra argument
    ***********/
    return auctionInstance.bid({from:accounts[1]}).then(function(result) {
	return auctionInstance.bid(0, 6)
    })
    .then(function (result) {
      /*
      We are testing for a negative condition and hence this particular block will not have executed if our test case was correct. If this part is executed then we throw an error and catch the error to assert false
      */
      throw("Failed to check remaining tokens less than count");
    }).catch(function (e) {
      var a = e.toString();
      if(e === "Failed to check remaining tokens less than count") {
        /**********
        TASK 2: This is the error which we had thrown. Should you assert true or false?
        HINT:   Use assert(false) to assert false
                Use assert(true) to assert true
        ***********/
        assert(false, "remaining tokens is not enough");
      } else {
        /**********
        TASK 3: assert the opposite here
        ***********/
        assert(true, "remaining tokens is enough");
      }
    })
  });

  //Modifier Checking
  it("Should NOT allow non owner to reveal winners", function() {
    /**********
    TASK 4: Call revealWinners from account 1
    ***********/
     return auctionInstance.revealWinners({from:accounts[1]})
     .then(function (instance) {
       /*
       We are testing for a negative condition and hence this particular block will not have executed if our test case was correct. If this part is executed then we throw an error and catch the error to assert false
       */
       throw("Failed to check owner in reveal winners");
     }).catch(function (e) {
       if(e === "Failed to check owner in reveal winners") {
         /**********
         TASK 5: This is the error which we had thrown. Should you assert true or false?
         HINT:   Use assert(false) to assert false
                 Use assert(true) to assert true
         ***********/
         assert(false);
       } else {
         /**********
         TASK 6: assert the opposite here
         ***********/
         assert(true);
       }
     })
   })


  it("Should set winners", function() {
    /**********
    TASK 7: Call register function from account 2
    ***********/
    return auctionInstance.register({from:accounts[2]})
    .then(function(result) {
      /**********
      TASK 8: Call register function from account 3
      ***********/
        return auctionInstance.register({from:accounts[3]})
    }).then(function() {
      /**********
      TASK 9: Call register function from account 4
      ***********/
        return auctionInstance.register({from:accounts[4]})
    }).then(function() {
      /**********
      TASK 10: Call bid method from accounts[2] of Auction.sol using auctionInstance and
      pass itemId=0, count=5 as arguments
      ***********/
        return auctionInstance.bid(0, 5, {from:accounts[2]})
    }).then(function() {
      /**********
      TASK 11: Call bid method from accounts[3] of Auction.sol using auctionInstance and
      pass itemId=1, count=5 as arguments
      ***********/
         return auctionInstance.bid(1, 5, {from:accounts[3]})
    }).then(function() {
      /**********
      TASK 12: Call bid method from accounts[4] of Auction.sol using auctionInstance and
      pass itemId=2, count=5 as arguments
      ***********/
         return auctionInstance.bid(2, 5, {from:accounts[4]})
    }).then(function() {
      /**********
      TASK 13: Call revealWinners function from accounts[0]
      ***********/
        return auctionInstance.revealWinners({from:accounts[0]})
    }).then(function() {
      /**********
      TASK 14: call winners function from accounts[0] to get the winner of item id 0
      ***********/
        return auctionInstance.winners(0, {from:accounts[0]})
    }).then(function(result) {
	assert.notEqual(result, '0x0000000000000000000000000000000000000000');
      /**********
      TASK 15:  assert to see if the winner address is not the default address
      HINT:     Default address is '0x0000000000000000000000000000000000000000'
                Use notEqual method of assert
                Parameters for notEqual : (result, default address , message);
      ***********/
      /*<CODE HERE>*/
      /**********
      TASK 16: call winners function from accounts[0] to get the winner of item id 1
      ***********/
      return auctionInstance.winners(1, {from:accounts[0]})
    }).then(function(result) {
	assert.notEqual(result, '0x0000000000000000000000000000000000000000');
      /**********
      TASK 17:  assert to see if the winner address is not the default address
      HINT:     Default address is '0x0000000000000000000000000000000000000000'
                Use notEqual method of assert
                Parameters for notEqual : (result, default address , message);
      ***********/
      /*<CODE HERE>*/
      /**********
      TASK 18: Call winners function from account 3 to get the winner of item id 2
      ***********/
      return auctionInstance.winners(2, {from:accounts[3]})
    }).then(function(result) {
      /**********
      TASK 19:  assert to see if the winner address is not the default address
      HINT:     Default address is '0x0000000000000000000000000000000000000000'
                Use notEqual method of assert
                Parameters for notEqual : (result, default address , message);
      ***********/
      /*<CODE HERE>*/
	assert.notEqual(result, '0x0000000000000000000000000000000000000000');
    })
  });
});
