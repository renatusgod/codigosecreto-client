import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterRequestInterface } from "../types/register-request.interface";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { BaseResponseInterface } from "src/app/shared/types/base-response.interface";
import { CurrentInvestorInterface } from "../types/current-investor.interface";
import { LoginRequestInterface } from "../types/login-request.interface";
import { BehaviorSubject } from "rxjs";
import { map, filter } from 'rxjs/operators';

@Injectable()
export class AuthService { 
  currentInvestor$ = new BehaviorSubject<CurrentInvestorInterface | null | undefined>(undefined);
  isLogged$ = this.currentInvestor$.pipe(
    filter(currentInvestor => currentInvestor !== undefined),
    map(Boolean),
  );
  
  constructor(
    private http: HttpClient)
  { }

  register(registerRequest: RegisterRequestInterface): Observable<BaseResponseInterface<any>> {
    const url = environment.apiUrl + '/auth/register';
    return this.http.post<BaseResponseInterface<any>>(url, registerRequest);
  }

  login(loginRequest: LoginRequestInterface): Observable<BaseResponseInterface<CurrentInvestorInterface>> {
    const url = environment.apiUrl + '/auth/login';
    return this.http.post<BaseResponseInterface<CurrentInvestorInterface>>(url, loginRequest);
  }

  getCurrentInvestor(): Observable<CurrentInvestorInterface> {
    const url = environment.apiUrl + '/auth/investor';
    return this.http.get<CurrentInvestorInterface>(url);
  }

  setToken(currentUser: CurrentInvestorInterface): void {
    localStorage.setItem('token', currentUser.token);
  }

  setCurrentUser(currentUser: CurrentInvestorInterface | null): void {
    this.currentInvestor$.next(currentUser);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentInvestor$.next(null);
  }
}
