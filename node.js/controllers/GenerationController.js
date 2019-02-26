const fs = require('fs');

const checkInputs = (name, symbol, supply) => {
  console.log(name);
  console.log(symbol);
  console.log(supply);

  if(name == ''){
    alert("Token Name Field is missing");
  }
  else if(symbol == ''){
    alert("Token Symbol Field is missing");
  }
  else if(supply == undefined){
    alert("Token Supply Field is missing");
  }
  else{
    return true;
  }
}

const personalizeSmartContract = (SmartContractTemplate, tName, tSymbol, tSupply) => {
  return new Promise(function(resolve, reject) {
    var template = fs.readFileSync(__dirname + SmartContractTemplate, 'utf8');
    var result = template.replace(/tName/g, '\''+tName+'\'');
    result = result.replace(/tSymbol/g, '\''+tSymbol+'\'');
    result = result.replace(/tSupply/g, tSupply.toString());
    resolve(result);
  });

}

export default {

  getPage: (req, res) => {
    res.render('generator');
  },

  postGeneratedSC: (req, res) => {
    //Check each input
    var tName = req.body.tokenName;
    var tSymbol = req.body.tokenSymbol;
    var tSupply = req.body.tokenSupply;
    var checked = checkInputs(tName, tSymbol, tSupply);

    //Personalize the SmartContract according to the inputs
    if (checked == true){
      var pathToTemplate = "/../contracts_template/SimpleTokenTemplate.sol";
      personalizeSmartContract(pathToTemplate, tName, tSymbol, tSupply)
      .then((contract) => {
        //Redirect to summary before deployment
        console.log('=======')
        console.log(contract);
        console.log('=======')
        res.render('summary', {contract : contract});
      });
    }
  },

}
