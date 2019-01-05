import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';


@Component({
  templateUrl: 'generator.html'
})

export class GeneratorPage {

  tokenName:string='';
  tokenSymbol:string='';
  tokenSupply:number= undefined;

  constructor(public navParams: NavParams, public navCtrl: NavController) {
  }

  checkInputs(){
    console.log(this.tokenName);
    console.log(this.tokenName);
    console.log(this.tokenName);
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
  }

  personalizeSmartContract(SmartContractPath){
    var pathToSmartContract = '../../../../contracts/SimpleTokenTemplate.sol';
    var reader = new FileReader();
    reader.onload = function(e) {
      var text = reader.result;
    }
    reader.readAsText(pathToSmartContract);
    console.log(reader.result)

    //var result = data.replace(/tName/g, this.tokenName);
    //result = result.replace(/tSymbol/g, this.tokenSymbol);
    //result = result.replace(/tSupply/g, this.tokenSupply);

  }

  deployOnRopsten(){
  }

  deployContract(){
  	//Check each input
    var checked = this.checkInputs();

  	//Personalize the SmartContract according to the inputs
    if (checked == true){
      var SmartContractPath = '../../../../contracts/PersonalizedSmartContract.sol'
      this.personalizeSmartContract(SmartContractPath);
    }

  	//Deploy the SmartContract on the chosen Blockchain
    this.deployOnRopsten();
  }

}
