import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewsComponent } from './views.component';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
  {
    path: '', component: ViewsComponent,
    children: [
      {
        path: 'tipo-cambio', loadChildren: () => import('./exchange-rate/exchange-rate.module').then(m => m.ExchangeRateModule)
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
