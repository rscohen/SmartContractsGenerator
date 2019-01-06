import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';


@Component({
  templateUrl: 'deployment.html'
})

export class DeploymentPage {

  SmartContractDraft:string='';

  constructor(public navParams: NavParams, public navCtrl: NavController) {
    this.SmartContractDraft = navParams.get('data');
    console.log(this.SmartContractDraft);
  }

  displayDraft(){

  }

  deployContract(){

  }

}
