# SmartContractsGenerator

Created thanks to : https://github.com/OpenZeppelin/openzeppelin-solidity

SimpleToken.sol is the main SmartContract.

# How to deploy a Smart Contract on Ropsten

![SmartContractDeployment](http://image.noelshack.com/fichiers/2018/52/3/1545840379-smartcontractdeploymentoptions.jpeg)
## Install a Node JS

Firstly we have to install Node and npm : 
- Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser
- npm is the package manager for JavaScript
```
$ brew install node
```	

## Set up Truffle & HDWallet Provider

[Truffle](https://truffleframework.com/truffle) is a development framework for Smart Contracts.

[HDWallet_Provider](https://github.com/trufflesuite/truffle-hdwallet-provider) is used to sign transactions for addresses derived from a 12-word mnemonic.

Truffle installation :

	$ npm install -g truffle
	
Creation of the working folder : 

	$ mkdir SmartContractsGenerator
	
	$ cd SmartContractsGenerator

Initialization of the working file with Truffle :
	
	$ Truffle init 

HDWallet Provider installation : 
	
	$ npm install --save truffle-hdwallet-provider@web3-one
	
## Creation of a contract
In ./contracts create a new contract named HelloWorld.sol : 
```Solidity
pragma solidity ^0.5.0;
contract HelloWorld {
    function sayHello() public pure returns(string memory){
        return 'hello world';
    }
}
```

## Deployment of the smart contract
In ./migrations create a deployment script specifically named 2_deploy_contracts.js :
```Solidity
var HelloWorld = artifacts.require("./HelloWorld.sol");
module.exports = function(deployer) {
    deployer.deploy(HelloWorld);
};
```

## Otionnal - How to protect your mnemonic
Indeed, you'll need to write your mnemonic (passphrase) in order to deploy your smart contract.
We'll use the [dotenv](https://github.com/motdotla/dotenv) node module to protect your mnemonic.

Installation of dotenv :

	$ npm install --save dotenv
	
Creation of your secret file containing your mnemonic :
	
	$ gedit .env
	
In .env, write you mnemonic :

	$ MNEMONIC="YOUR_MNEMONIC"

## Configuration of the provider and the access to the ropsten network
In truffle-config.js (or truffle.js on windows), add the following snippet inside module.exports:

```
require('dotenv').config();
var HDWalletProvider = require("truffle-hdwallet-provider");
var MNEMONIC = process.env["MNEMONIC"];

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
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
Now deploy (or migrate) your contract to Ropsten as follows. By default, Truffle only deploys to the local developer network :

	$ truffle migrate --network ropsten
	
You should see : 
``` 
Running migration: 1_initial_migration.js
Deploying Migrations…
… 0xd01dd7...
Migrations: 0xf741...
Saving successful migration to network…
… 0x78ed...
Saving artifacts…
Running migration: 2_deploy_contracts.js
Deploying HelloWorld…
… 0x0aa9...
HelloWorld: [SAVE THIS ADDRESS!!]
Saving successful migration to network…
… 0xee95...
Saving artifacts…
``` 
Good Job ! Your smart contract is deployed on Ropsten. Remember to save the smart contract's address.

## Access your deployed contract 

Set up your Truffle console to Ropsten network :

	$ truffle console --network ropsten
	
Invoke your contract function and say hello :

	$ HelloWorld.deployed().then(function(instance){return instance.sayHello()});

