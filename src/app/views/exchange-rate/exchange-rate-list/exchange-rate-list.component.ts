import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../exchange-rate.service';
import { error } from 'protractor';

@Component({
  selector: 'exchange-rate-list',
  templateUrl: './exchange-rate-list.component.html',
  styleUrls: ['./exchange-rate-list.component.css']
})
export class ExchangeRateListComponent implements OnInit {

  coinsAll: any[];
  coins: any[];
  selectedOriginalCurrency: any;
  selectedTargetCurrency: any;
  conversionFactor: any;
  date: Date;

  exchanges: any = [];

  showEdit: boolean;

  newOriginalCurrency: any;
  newTargetCurrency: any;
  newConversionFactor: any;
  newDate: Date;
  idUpdate: any

  subList: any;

  labelButton: string;
  headerModal: string;
  clickButton: any;

  isEdit: boolean;
  isNew: boolean;

  constructor(private exchangeRateService: ExchangeRateService) { }

  ngOnInit(): void {

    this.loadCoins();
    this.exchanges = [];

  }

  loadCoins(allValue: boolean = false): void {

    this.exchangeRateService.listCoins().subscribe(data => {
      this.coins = data;

      this.coinsAll = [{id: '', value: '-Seleccione-'}, ...this.coins];

      this.selectedOriginalCurrency = this.coinsAll[0];
      this.selectedTargetCurrency = this.coinsAll[0];

    });

  }

  search(): void {

    this.listExchangeRates();

  }

  listExchangeRates(param?: any) {

    let params = param || {
      originalCurrency: this.selectedOriginalCurrency?.id || 0,
      targetCurrency: this.selectedTargetCurrency?.id || 0,
      exchangeDate: this.date? this.date.getFullYear()+"-"+String(this.date.getMonth() + 1).padStart(2, '0')+"-"+String(this.date.getDate()).padStart(2, '0') : ''
    }

    if(this.subList) {
      this.subList.unsubscribe();
    }

    this.exchanges = [];
    this.subList = this.exchangeRateService.listExchangeRates(params).subscribe({
      next: data => {
        data = JSON.parse(data);
        data.originalCurrency = this.coins.filter(c => c.id == data.originalCurrency.id)[0];
        data.targetCurrency = this.coins.filter(c => c.id == data.targetCurrency.id)[0];

        if(!this.exchanges.filter(e => e.id == data.id)[0]){


          this.exchanges = [...this.exchanges, data];
        }

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

  edit(id): void {
    this.isEdit = true;
    this.showEdit = true;
    let _exchange = this.exchanges.filter(e => e.id == id)[0];
    var parts = _exchange.exchangeDate.split('-');
    this.newOriginalCurrency = _exchange.originalCurrency;
    this.newTargetCurrency = _exchange.targetCurrency;
    this.newConversionFactor = _exchange.conversionFactor;
    this.newDate = new Date(parts[0], parts[1] - 1, parts[2]);
    this.idUpdate = id;
    this.labelButton = 'Actualizar';
    this.headerModal = 'Editar';
    this.clickButton = this.onUpdate;
  }

  onUpdate(): void {

    let body = {
      id: this.idUpdate,
      originalCurrency: this.newOriginalCurrency,
      targetCurrency: this.newTargetCurrency,
      conversionFactor: this.newConversionFactor,
      exchangeDate: this.newDate? this.newDate.getFullYear()+"-"+String(this.newDate.getMonth() + 1).padStart(2, '0')+"-"+String(this.newDate.getDate()).padStart(2, '0') : ''
    }
    this.showEdit = false;

    this.exchangeRateService.updateExchangeRate(body).subscribe(data => {
      this.showEdit = false;
      this.listExchangeRates();

    }, error => {
      console.log(error);
    })

  }

  new() {
    this.isNew = true;
    this.newOriginalCurrency = '';
    this.newTargetCurrency = '';
    this.newConversionFactor = '';
    this.newDate = new Date()
    this.showEdit = true;
    this.labelButton = 'Guardar';
    this.headerModal = 'Nuevo';
    this.clickButton = this.onSave;
  }

  onSave() {
    let body = {
      originalCurrency: this.newOriginalCurrency.id? this.newOriginalCurrency : {id:0, value: this.newOriginalCurrency},
      targetCurrency: this.newTargetCurrency.id? this.newTargetCurrency : {id:0, value: this.newTargetCurrency},
      conversionFactor: this.newConversionFactor,
      exchangeDate: this.newDate? this.newDate.getFullYear()+"-"+String(this.newDate.getMonth() + 1).padStart(2, '0')+"-"+String(this.newDate.getDate()).padStart(2, '0') : ''
    }

    this.exchangeRateService.saveExchangeRate(body).subscribe(data => {
      this.showEdit = false;
      this.listExchangeRates();
      this.loadCoins();

    }, error => {
      console.log(error);
    })
  }


}
