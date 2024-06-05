import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseResponseInterface } from "../types/base-response.interface";
import { ShareInterface } from "../models/share.interface";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class ShareService {
  constructor(
    private http: HttpClient
  ) {}

  createShare(title: string): Observable<BaseResponseInterface<ShareInterface>> {
    const url = environment.apiUrl + '/shares';
    return this.http.post<BaseResponseInterface<ShareInterface>>(url, { title: title });
  }

  getShares(): Observable<BaseResponseInterface<ShareInterface[]>> {
    const url = environment.apiUrl + '/shares';
    return this.http.get<BaseResponseInterface<ShareInterface[]>>(url);
  }
}