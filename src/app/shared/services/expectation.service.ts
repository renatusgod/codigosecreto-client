import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseResponseInterface } from "../types/base-response.interface";
import { ExpectationInterface } from "../models/expectation.interface";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class ExpectationService {
  constructor(
    private http: HttpClient
  ) {}

  createExpectation(description: string, shareId: string): Observable<BaseResponseInterface<ExpectationInterface>> {
    const url = environment.apiUrl + `/shares/${shareId}/expectations`;
    return this.http.post<BaseResponseInterface<ExpectationInterface>>(url, { description,  shareId });
  }

  getExpectations(): Observable<BaseResponseInterface<ExpectationInterface[]>> {
    const url = environment.apiUrl + '/shares/expectations';
    return this.http.get<BaseResponseInterface<ExpectationInterface[]>>(url);
  }
}