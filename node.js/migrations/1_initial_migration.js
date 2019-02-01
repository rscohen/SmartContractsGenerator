var Migrations = artifacts.require(__dirname + "/../contracts/Migrations.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
