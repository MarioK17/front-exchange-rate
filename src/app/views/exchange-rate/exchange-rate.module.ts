import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PanelModule } from 'primeng/panel';
import { ExchangeRateComponent } from './exchange-rate.component';
import { ExchangeRateCalculateComponent } from './exchange-rate-calculate/exchange-rate-calculate.component';
import { ExchangeRateListComponent } from './exchange-rate-list/exchange-rate-list.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { ExchangeRateRoutingModule } from './exchange-rate-routing.module';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { PipesModule } from './pipes/pipes.module';
import { ExchangeRateAuditorComponent } from './exchange-rate-auditor/exchange-rate-auditor.component';




@NgModule({
  declarations: [ExchangeRateComponent, ExchangeRateCalculateComponent, ExchangeRateListComponent, ExchangeRateAuditorComponent],
  imports: [
    CommonModule,
    ExchangeRateRoutingModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    CascadeSelectModule,
    FormsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CalendarModule,
    TableModule,
    DialogModule,
    PipesModule
  ]
})
export class ExchangeRateModule { }
