import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';


@Component({
  templateUrl: 'generator.html'
})

export class GeneratorPage {

  constructor(public navParams: NavParams, public navCtrl: NavController) {
  }

  checkInputs(){
    var x;
    if(tokenName.value == ""){
      alert("Token Name Field is missing");
    } 
    else if(tokenSymbol.value == ""){
      alert("Token Symbol Field is missing");
    }
    else {
      x = document.getElementById("tokenSupply").value
      console.log("x");
      console.log(x);
      if (x == ""){
        alert("Token Supply Field is missing");
      }
    }
  }

  personalizeSmartContract(){
    const phrase = 'I love my dog! Dogs are great'
    const stripped = phrase.replace(/dog/g, '')
  }

  deployOnRopsten(){    
  }

  deployContract(){
  	//Check each input
    this.checkInputs();

  	//Personalize the SmartContract according to the inputs
    

  	//Deploy the SmartContract on the chosen Blockchain
    this.deployOnRopsten();
  }
  
}