import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { BaseResponseInterface } from "../types/base-response.interface";
import { ExpectativeIndexInterface } from "../models/expectative-index.interface";
import { ShareIndexInterface } from "../models/share-index.interface";

@Injectable()
export class IndexsService {
  constructor(
    private http: HttpClient
  ) { }

  getShareIndexs(startAt: Date, endAt: Date): Observable<BaseResponseInterface<ShareIndexInterface[]>> {
    let params = new HttpParams();
    params = params.append('startAt', startAt.toDateString());
    params = params.append('endAt', endAt.toDateString());

    const url = environment.apiUrl + '/indexs/share';
    return this.http.get<BaseResponseInterface<ShareIndexInterface[]>>(url, { params });
  }

  getExpectativeIndexs(startAt: Date, endAt: Date): Observable<BaseResponseInterface<ExpectativeIndexInterface[]>> {
    let params = new HttpParams();
    params = params.append('startAt', startAt.toDateString());
    params = params.append('endAt', endAt.toDateString());

    const url = environment.apiUrl + '/indexs/expectative';
    return this.http.get<BaseResponseInterface<ExpectativeIndexInterface[]>>(url, { params });
  }
}