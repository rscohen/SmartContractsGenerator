export default {

  //tokenName:string='';
  //tokenSymbol:string='';
  //tokenSupply:number= undefined;

  getPage : (req, res) => {
    res.render('generator');
  },

  checkInputs(){
    console.log(this.tokenName);
    console.log(this.tokenSymbol);
    console.log(this.tokenSupply);
    if(this.tokenName == ''){
      alert("Token Name Field is missing");
    }
    else if(this.tokenSymbol == ''){
      alert("Token Symbol Field is missing");
    }
    else if(this.tokenSupply == undefined){
      alert("Token Supply Field is missing");
    }
    else{
      return true;
    }
  },

  readTextFile(file){
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, false);
      rawFile.onreadystatechange = function ()
      {
          if(rawFile.readyState === 4)
          {
              if(rawFile.status === 200 || rawFile.status == 0)
              {
                  var allText = rawFile.responseText;
                  alert(allText);
              }
          }
      }
      rawFile.send(null);
  },

  openExternalFile(url){
    var oReq = new XMLHttpRequest();
    oReq.open("get", url, false);
    oReq.send();
    return oReq;
  },

  personalizeSmartContract(SmartContractTemplate){
    var template = this.openExternalFile(SmartContractTemplate).responseText;
    var result = template.replace(/tName/g, '\''+this.tokenName+'\'');
    result = result.replace(/tSymbol/g, '\''+this.tokenSymbol+'\'');
    result = result.replace(/tSupply/g, this.tokenSupply.toString());
    return result;
  },

  submitContract(){
  	//Check each input
    var checked = this.checkInputs();

  	//Personalize the SmartContract according to the inputs
    if (checked == true){
      var urlToTemplate = "https://raw.githubusercontent.com/rscohen/SmartContractsGenerator/master/contracts/SimpleTokenTemplate.sol";
      var template = this.personalizeSmartContract(urlToTemplate);
      console.log('TEMPLATE: ' + template);

      //Redirect to summary before deployment
      this.navCtrl.push(DeploymentPage, {
        data: template
      });
    }
  },

  createSC(){

  },

}
