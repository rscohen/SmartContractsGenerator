var Output = artifacts.require(__dirname+"../contracts/Output.sol");
module.exports = function(deployer) {
    deployer.deploy(Output);
    console.log('Deployed');
};
