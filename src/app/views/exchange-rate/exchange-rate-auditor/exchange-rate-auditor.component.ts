import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../exchange-rate.service';

@Component({
  selector: 'app-exchange-rate-auditor',
  templateUrl: './exchange-rate-auditor.component.html',
  styleUrls: ['./exchange-rate-auditor.component.css']
})
export class ExchangeRateAuditorComponent implements OnInit {


  subList: any;
  users: any = [];
  coins: any = [];

  constructor(private exchangeRateService: ExchangeRateService) { }

  ngOnInit(): void {

    this.exchangeRateService.listCoins().subscribe(data => {
      this.coins = data;
      this.loadAuditor();
    });



  }

  loadAuditor(): void {

    this.subList = this.exchangeRateService.listAuditor().subscribe({
      next: data => {
        data = JSON.parse(data);
        data.originalCurrency = this.coins.filter(c => c.id == data.originalCurrency)[0].value;
        data.targetCurrency = this.coins.filter(c => c.id == data.targetCurrency)[0].value;

        this.users = [...this.users, data];

      },
      error: err => {
        console.error(err);
        this.subList.unsubscribe();
      },
      complete: () => {
        this.subList.unsubscribe();
      }
    });

  }

}
