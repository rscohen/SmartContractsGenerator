import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable'

@Component({
  templateUrl: 'generator.html'
})

export class GeneratorPage {

  constructor(public navParams: NavParams, public navCtrl: NavController) {
  }

  checkSymbol(){

  }

  deployOnRopsten(){
    
  }

  deployContract(){
  	//Check each input

  	//Personalize the SmartContract according to the inputs

  	//Deploy the SmartContract on the chosen Blockchain
    this.deployOnRopsten();
  }
  
}