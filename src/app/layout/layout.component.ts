import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  items: MenuItem[];

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Gestion tipo de cambio',
        icon: 'pi pi-fw pi-money-bill',
        items: [
          {label: 'Cambio', icon: 'pi pi-fw pi-refresh', routerLink: ['/tipo-cambio/calcular']},
          {label: 'Tipo de cambio', icon: 'pi pi-fw pi-list', routerLink: ['/tipo-cambio/listar']},
          {label: 'Auditor', icon: 'pi pi-fw pi-list', routerLink: ['/tipo-cambio/auditor']}
        ]
      }
    ]
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
