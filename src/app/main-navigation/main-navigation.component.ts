import { Component } from '@angular/core';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent {
  constructor(private sharedService: SharedService) {}

  onRegister() {
    this.sharedService.triggerRegister();
  }
 
}
