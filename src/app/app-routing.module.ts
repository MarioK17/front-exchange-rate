import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [

  {
    path: '',
    children: [
      {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN', 'USER'] },
        loadChildren: () => import('./views/views.module').then(m => m.ViewsModule)
      },
      { path:'login', component: LoginComponent},
      { path: '**', component: LayoutComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
