import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../exchange-rate.service';
import { error } from 'protractor';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-exchange-rate-calculate',
  templateUrl: './exchange-rate-calculate.component.html',
  styleUrls: ['./exchange-rate-calculate.component.css']
})
export class ExchangeRateCalculateComponent implements OnInit {

  coins: any[];

  selectedOriginalCurrency: any;
  selectedTargetCurrency: any;

  originalAmount: any;
  targetAmount: any;
  notFound: boolean;

  constructor(private exchangeRateService: ExchangeRateService) { }

  ngOnInit(): void {

    this.exchangeRateService.listCoins().subscribe(data => {
      this.coins = data;
      this.selectedOriginalCurrency = this.coins[0];
      this.selectedTargetCurrency = this.coins[0];

    });

  }

  calculate(): void {

    let params = {
      originalCurrency: this.selectedOriginalCurrency.id,
      targetCurrency: this.selectedTargetCurrency.id,
      amount: this.originalAmount
    }

    this.exchangeRateService.calculate(params).subscribe(data => {
      this.targetAmount = data;
      this.notFound = false;
    }, (error: HttpErrorResponse) => {
      console.log(error.status);
      if(error.status == 404) {
        this.notFound = true;
      }
    });

  }

}
