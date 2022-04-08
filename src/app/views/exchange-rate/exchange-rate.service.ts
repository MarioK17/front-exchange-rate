import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EventSourcePolyfill } from 'ng-event-source';
import { AuthenticationService } from '../../service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  url = 'http://localhost:8080';

  constructor(private http: HttpClient, private zone: NgZone,
              private authenticationService: AuthenticationService) {

  }

  listExchangeRates(params: any = {} ): any {

    let currentUser = this.authenticationService.currentUserValue;

    return Observable.create(
      observer => {
        let source = new EventSourcePolyfill(`${this.url}/exchangeRate?originalCurrency=${params.originalCurrency}&targetCurrency=${params.targetCurrency}&exchangeDate=${params.exchangeDate}`, {
          headers: {
            'Authorization': 'Bearer ' + currentUser.token
          }
        });
        source.onmessage = event => {
          this.zone.run(() => {
            observer.next(event.data)
          })
        }
        source.onerror = event => {
          this.zone.run(() => {
            observer.error(event);
            source.close();
          })
        }
      }
    )

  }

  updateExchangeRate(body: any = {}): Observable<any> {


    return this.http.put(`${this.url}/exchangeRate`, body);
  }


  saveExchangeRate(body: any = {}): Observable<any> {

    return this.http.post(`${this.url}/exchangeRate`, body);
  }

  listCoins(): Observable<any> {

    return this.http.get(`${this.url}/coin`, );
  }

  calculate(params: any = {}): Observable<any> {

    return this.http.get(`${this.url}/exchangeRate/calculate`, { params: params});
  }

  listAuditor(): any {

    let currentUser = this.authenticationService.currentUserValue;

    return Observable.create(
      observer => {
        let source = new EventSourcePolyfill(`${this.url}/exchangeAuditor`, {
          headers: {
            'Authorization': 'Bearer ' + currentUser.token
          }
        });
        source.onmessage = event => {
          this.zone.run(() => {
            observer.next(event.data)
          })
        }
        source.onerror = event => {
          this.zone.run(() => {
            observer.error(event);
            source.close();
          })
        }
      }
    )

  }


}
