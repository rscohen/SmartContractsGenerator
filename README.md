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
pragma solidity ^0.5.00;
contract HelloWorld {
    function sayHello() public pure returns(string memory){
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
4Bis "Optionnal" - How to protect your mnemonic (you'll need to write it to deploy the smart contract):
We'll use the dotenv node module. 
	$ npm install --save dotenv
	
	$ gedit .env -> crée le fichier .env qui stockera vos données confidentielles
	
Remplir le .env comme cela :
	$ MNEMONIC="YOUR_MNEMONIC"
	
5 - Configure Ropsten network and the provider
In truffle-config.js (or truffle.js on windows), add the following snippet inside module.exports:


```
require('dotenv').config();
var HDWalletProvider = require("truffle-hdwallet-provider");
const MNEMONIC = new Buffer(process.env["MNEMONIC"], "hex"); #ZOB PAS SUR DU HEX

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/YOUR_API_KEY")
      },
      network_id: 3,
      gas: 4000000      //make sure this gas allocation isn't over 4M, which is the max
    }
  }
};
```
