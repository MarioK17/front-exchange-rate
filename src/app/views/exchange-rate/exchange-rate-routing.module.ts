import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExchangeRateCalculateComponent } from './exchange-rate-calculate/exchange-rate-calculate.component';

import { ExchangeRateListComponent } from './exchange-rate-list/exchange-rate-list.component';
import { ExchangeRateComponent } from './exchange-rate.component';
import { AuthGuard } from '../../auth/auth.guard';
import { ExchangeRateAuditorComponent } from './exchange-rate-auditor/exchange-rate-auditor.component';


const routes: Routes = [

  { path: '', component: ExchangeRateComponent,
    children: [

      { path: '', redirectTo: 'calcular', pathMatch: 'full' },
      { path: 'calcular', component: ExchangeRateCalculateComponent ,canActivate: [AuthGuard], data: { roles: ['ADMIN', 'USER'] }},
      { path: 'listar', component: ExchangeRateListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] }},
      { path: 'auditor', component: ExchangeRateAuditorComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] }}

    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangeRateRoutingModule { }
