var contract = null;

const sh = (cmd) => {
  const exec = require('child_process').exec
  exec(cmd, (err, stdout, stderr) => {
    process.stdout.write(stdout)
  })
}

const saveContract = () => {
  const fs = require('fs');
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

  deploy: (req, res) => {
    var network = req.body.network;
    saveContract();
    sh('truffle build && truffle migrate --network ropsten');
    res.render('final');
  },
}
