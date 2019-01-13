var Output = artifacts.require("./Output.sol");
module.exports = function(deployer) {
    deployer.deploy(Output)
    console.log('Deployed');
};
