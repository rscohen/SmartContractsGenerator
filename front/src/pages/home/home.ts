import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {GeneratorPage} from '../generator/generator';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  backToHome(){
    this.navCtrl.push(GeneratorPage);
  }

}
