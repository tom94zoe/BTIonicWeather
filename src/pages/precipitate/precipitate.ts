import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PercipitatePageSettings} from '../precipitate/precipitate-settings';

@Component({
  selector: 'page-percipitate',
  templateUrl: 'precipitate.html'
})
export class PercipitatePage {

  constructor(public navCtrl: NavController) {

  }

  ngOnInit(){
    this.openSettings();
  }

  openSettings(){
    this.navCtrl.push(PercipitatePageSettings);
  }

}
