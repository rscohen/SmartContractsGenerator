# SmartContractsGenerator

Created thanks to : https://github.com/OpenZeppelin/openzeppelin-solidity

SimpleToken.sol is the main SmartContract.

# How to deploy a Smart Contract - With no dependency atm

Tuto : https://medium.com/coinmonks/5-minute-guide-to-deploying-smart-contracts-with-truffle-and-ropsten-b3e30d5ee1e

1 - Installer un Node JS. -> brew install Node. Ca installe Node et npm.

2 - Set up Truffle : https://truffleframework.com/truffle C’est un framework de développement pour les Smart Contracts. 

	$ npm install -g truffle
	
	$ mkdir SmartContractsGenerator
	
	$ Truffle init 
	
	$ npm install --save truffle-hdwallet-provider -> Installation HD Wallet Provider
	

3 - Create your contract : in ./contracts create a new contract HelloWorld.sol : 
```Solidity
pragma solidity ^0.4.23;
contract HelloWorld {
    function sayHello() public pure returns(string){
        return(“hello world”);
    }
}
```
4 - Deploy your contract : in ./migrations create a deployment script specifically named 2_deploy_contracts.js :
```Solidity
var HelloWorld = artifacts.require(“HelloWorld”);
module.exports = function(deployer) {
    deployer.deploy(HelloWorld, “hello”);
    // Additional contracts can be deployed here
};
```
