<<<<<<< HEAD
var Migrations = artifacts.require(__dirname + "/../contracts/Migrations.sol");
=======
var Migrations = artifacts.require(__dirname+"/../contracts/Migrations.sol");
>>>>>>> 9e28b8cfdb30ecbaf2cf787fe158f5d75306b1a4

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
