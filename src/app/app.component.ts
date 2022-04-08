import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import {MegaMenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front-exchange-rate';

  items: MenuItem[];


  constructor(private primengConfig: PrimeNGConfig) {

  }


  ngOnInit(): void {

    this.primengConfig.ripple = true;


  }

}
