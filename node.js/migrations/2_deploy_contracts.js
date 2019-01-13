var Output = artifacts.require(__dirname+"/../contracts/Output.sol");
module.exports = function(deployer,req,res) {
    deployer.deploy(Output)
};
