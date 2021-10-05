import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from '../../models/bill';

@Injectable({
  providedIn: 'root',
})
export class BillHttpService {
  constructor(private http: HttpClient) {}
  // apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/Bill';
  apiUrl = 'https://localhost:5001';

  fetchBill(page: number, size: number): Observable<Bill> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Bill>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchBillByLearnerID(
    page: number,
    size: number,
    id: string
  ): Observable<Bill> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size)
      .set('Id', id);
    console.log(params.toString());
    return this.http.get<Bill>(this.apiUrl + '/byLearnerID', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchBillByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Bill> {
    const params = new HttpParams()
      .set('Property', property)
      .set('Value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Bill>(this.apiUrl + '/search', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  filterBillByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Bill> {
    const params = new HttpParams()
      .set('Value', value)
      .set('Property', property)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Bill>(this.apiUrl + '/filter', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  sortBillByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ): Observable<Bill> {
    const params = new HttpParams()
      .set('SortBy', value)
      .set('Order', order)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Bill>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  uploadBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.apiUrl, bill, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomBill(): Observable<Bill> {
    return this.http.post<Bill>(this.apiUrl + '/randomBill', {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteBill(id: Array<string>): Observable<Object> {
    return this.http.post<Object>(this.apiUrl + '/delete', id, {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteAll(): Observable<ArrayBuffer> {
    return this.http.delete<ArrayBuffer>(this.apiUrl, {
      reportProgress: true,
      observe: 'body',
    });
  }

  getBill(id: string): Observable<Bill> {
    return this.http.get<Bill>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.http.put<Bill>(this.apiUrl, bill, {
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchAll(): Observable<Bill> {
    return this.http.get<Bill>(this.apiUrl, {
      reportProgress: true,
      observe: 'body',
    });
  }
}
