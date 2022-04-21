var Ballot = artifacts.require("Ballot");

module.exports = function(deployer) {
  deployer.deploy(Ballot);
};
