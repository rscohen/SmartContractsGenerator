require('dotenv').config();
const fs = require('fs');
const solc = require('solc');
var Web3 = require('web3');
const Tx = require('ethereumjs-tx');

var contract = null;

// %% BUILDING SMARTCONTRACT %% //
// Input parameters for solc
// Refer to https://solidity.readthedocs.io/en/develop/using-the-compiler.html#compiler-input-and-output-json-description
var solcInput = {
    language: "Solidity",
    sources: { },
    settings: {
        optimizer: {
            enabled: true
        },
        evmVersion: "byzantium",
        outputSelection: {
            "*": {
              "": [
                "legacyAST",
                "ast"
              ],
              "*": [
                "abi",
                "evm.bytecode.object",
                "evm.bytecode.sourceMap",
                "evm.deployedBytecode.object",
                "evm.deployedBytecode.sourceMap",
                "evm.gasEstimates"
              ]
            },
        }
    }
};

// %% DEPLOYING SMARTCONTRACT %% //
let accounts = [
    {
        // Develop
        address: process.env.PUBLIC_KEY,
        key: process.env.PRIVATE_KEY
    },
];

let selectedHost = 'https://ropsten.infura.io/v3/eac8fbafbf314d08b80b7557834dd50d';

let selectedAccountIndex = 0; // Using the first account in the list

var web3 = new Web3(new Web3.providers.HttpProvider(selectedHost));

//TODO : set gasPrice automatically
let gasPrice = 41e9;
let gasPriceHex = web3.utils.toHex(gasPrice);
let gasLimitHex = web3.utils.toHex(6000000);
let block = web3.eth.getBlock("latest");
console.log("Web3 version:", web3.version);

// Try to lookup imported sol files in "contracts" folder or "node_modules" folder
const findImports = (importFile) => {
    console.log("Import File:" + importFile);
    try {
        // Find in contracts folder first
        var result = fs.readFileSync(__dirname + "/../contracts/" + importFile, 'utf8');
        return { contents: result };
    } catch (error) {
        // Try to look into node_modules
        try {
            var result = fs.readFileSync(__dirname + "/../node_modules/" + importFile, 'utf8');
            return { contents: result };
        } catch (error) {
            console.log(error.message);
            return { error: 'File not found' };
        }
    }
}

const saveContract = () => {
  fs.writeFile(__dirname + '/../contracts/Output.sol', contract, (err) => {
    // In case of a error throw err.
    if (err) throw err;
  })
}

// Compile the sol file in "contracts" folder and output the built json file to "build/contracts"
const buildContract = (contractname) => {
    let jsonOutputName = contractname + '.json';
    let jsonOutputFile = __dirname + '/../build/contracts/' + jsonOutputName;

    solcInput.sources[contractname + '.sol'] = {
        "content": contract
    };

    let solcInputString = JSON.stringify(solcInput);
    let output = solc.compileStandardWrapper(solcInputString, findImports);

    let jsonOutput = JSON.parse(output);
    let isError = false;

    if (jsonOutput.errors) {
        jsonOutput.errors.forEach(error => {
            console.log(error.severity + ': ' + error.component + ': ' + error.formattedMessage);
            if (error.severity == 'error') {
                isError = true;
            }
        });
    }

    if (isError) {
        // Compilation errors
        console.log('Compile error!');
        return false;
    }

    // Update the sol file checksum
    //jsonOutput['contracts'][contract]['checksum'] = contractFileChecksum;

    let formattedJson = JSON.stringify(jsonOutput, null, 4);

    // Write the output JSON
    fs.writeFileSync(jsonOutputFile, formattedJson);

    console.log('==============================');

    return true;
}

const deployContract = (smartcontract, callback) => {
    // It will read the ABI & byte code contents from the JSON file in ./build/contracts/ folder
    let jsonOutputName = smartcontract + '.json';
    let jsonFile = __dirname + '/../build/contracts/' + jsonOutputName;

    // After the smart deployment, it will generate another simple json file for web frontend.
    let webJsonFile = __dirname + '/../www/assets/contracts/' + jsonOutputName;
    let result = false;

    try {
        result = fs.statSync(jsonFile);
    } catch (error) {
        console.log(error.message);
        return false;
    }

    // Read the JSON file contents
    let contractJsonContent = fs.readFileSync(jsonFile, 'utf8');
    let jsonOutput = JSON.parse(contractJsonContent);
    // Retrieve the ABI
    let abi = jsonOutput['contracts'][smartcontract + '.sol'][smartcontract]['abi'];

    // Retrieve the byte code
    let bytecode = jsonOutput['contracts'][smartcontract + '.sol'][smartcontract]['evm']['bytecode']['object'];

    let tokenContract = new web3.eth.Contract(abi);

    // Prepare the smart contract deployment payload
    // If the smart contract constructor has mandatory parameters, you supply the input parameters like below
    //
    // contractData = tokenContract.new.getData( param1, param2, ..., {
    //    data: '0x' + bytecode
    // });
    //var contractData = tokenContract.new.getData({data: '0x' + bytecode});
    var contractData ='0x' + bytecode;
    // Prepare the raw transaction information
    let rawTx = {
        chainId: 3,
        gasPrice: gasPriceHex,
        gasLimit: gasLimitHex,
        data: contractData,
        from: accounts[selectedAccountIndex].address
    };

    // Get the account private key, need to use it to sign the transaction later.
    //let privateKey = new Buffer(accounts[selectedAccountIndex].key, 'hex')
    let privateKey = '0x' + accounts[selectedAccountIndex].key

    let tx = new Tx(rawTx);
    let treceipt = null;
    web3.eth.accounts.signTransaction(rawTx, privateKey)
    .then(RLPencodedTx => {
        web3.eth.sendSignedTransaction(RLPencodedTx['rawTransaction'])
            .on('receipt', (receipt) => {
              console.log("====== Receipt received ======");
              console.log("Contract Address:", receipt.contractAddress);
              console.log("Gas Used:", receipt.gasUsed);
              console.log("====== ================ ======");
              console.log(receipt);
              console.log("====== ================ ======");
              callback(receipt);
            });
    });
}

export default {

  getPage: (req, res) => {
    contract = req.body.contract;
    res.render('deployment');
  },

  deploy: (req, res) => {
    var network = req.body.network;
    //Save contract.sol
    saveContract();
    //Build contract.json
    let result = buildContract('Output');
    //sh('sudo truffle build && sudo truffle migrate --network ropsten');
    //Deploy contract
    deployContract('Output', function(receipt){
      console.log('LAST CALLBACK');
      console.log(receipt);
      res.render('final', {
        "address":receipt.contractAddress,
        "gasUsed":receipt.gasUsed,
        "txoHash": receipt.transactionHash,
      });
    });
  },
}
