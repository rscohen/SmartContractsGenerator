const solc = require('solc');
const fs = require('fs');

var contract = null;

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

// Compile the sol file in "contracts" folder and output the built json file to "build/contracts"
const buildContract = (contractname) => {
    let jsonOutputName = 'Output' + '.json';
    let jsonOutputFile = __dirname + '/../build/contracts/' + jsonOutputName;

    solcInput.sources[contractname] = {
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

//%%%%%%%%%%%%%%%%% OLD CODE %%%%%%%%%%%%%%

const sh = (cmd) => {
  const exec = require('child_process').exec
  exec(cmd, (err, stdout, stderr) => {
    process.stdout.write(stdout)
  })
}

const saveContract = () => {
  fs.writeFile(__dirname + '/../contracts/Output.sol', contract, (err) => {
    // In case of a error throw err.
    if (err) throw err;
  })
}

export default {

  getPage: (req, res) => {
    contract = req.body.contract;
    res.render('deployment');
  },

  load: () => {
    var mydata = JSON.parse(data);
    alert(mydata[0].networks);
  },

  deploy: (req, res) => {
    var network = req.body.network;
    //Save contract.sol
    saveContract();
    //Build contract.json
    let result = buildContract('Output.sol');
    //sh('sudo truffle build && sudo truffle migrate --network ropsten');
    res.render('final')
  },
}
