import { exec } from 'child_process';

var contract = null;

const sh = (cmd) => {
  return new Promise(function (resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

const saveContract = () => {
  const fs = require('fs');
  fs.writeFile('Output.sol', contract, (err) => {
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
  },
}
