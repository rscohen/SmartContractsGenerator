<<<<<<< HEAD
var Output = artifacts.require(__dirname + "/../contracts/Output.sol");
module.exports = function(deployer) {
=======
var Output = artifacts.require(__dirname+"/../contracts/Output.sol");
module.exports = function(deployer,req,res) {
>>>>>>> 9e28b8cfdb30ecbaf2cf787fe158f5d75306b1a4
    deployer.deploy(Output)
};
