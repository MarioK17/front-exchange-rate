import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  env = environment;
  username: any;
  constructor(private http: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<any>((JSON.parse(localStorage.getItem('currentUser'))));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username, password) {

    this.username = username;

    let _url = 'http://localhost:8080/login';

    return this.http.post<any>(_url, { username, password })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
