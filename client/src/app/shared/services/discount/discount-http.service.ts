import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Discount } from '../../models/discount';

@Injectable({
  providedIn: 'root',
})
export class DiscountHttpService {
  constructor(private http: HttpClient) {}
  // apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/Discount';
  apiUrl = 'https://localhost:5001/api/Discount';

  fetchDiscount(page: number, size: number): Observable<Discount> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Discount>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchDiscountByLearnerID(
    page: number,
    size: number,
    id: string
  ): Observable<Discount> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size)
      .set('Id', id);
    console.log(params.toString());
    return this.http.get<Discount>(this.apiUrl + '/byLearnerID', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchDiscountByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Discount> {
    const params = new HttpParams()
      .set('Property', property)
      .set('Value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Discount>(this.apiUrl + '/search', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  filterDiscountByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Discount> {
    const params = new HttpParams()
      .set('Value', value)
      .set('Property', property)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Discount>(this.apiUrl + '/filter', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  sortDiscountByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ): Observable<Discount> {
    const params = new HttpParams()
      .set('SortBy', value)
      .set('Order', order)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Discount>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  uploadDiscount(discount: Discount): Observable<Discount> {
    return this.http.post<Discount>(this.apiUrl, discount, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomDiscount(): Observable<Discount> {
    return this.http.post<any>(
      'https://localhost:5001/api/Generate/generate-discount-data',
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  deleteDiscount(id: Array<string>): Observable<Object> {
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

  getDiscount(id: string): Observable<Discount> {
    return this.http.get<Discount>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  updateDiscount(discount: Discount): Observable<Discount> {
    return this.http.put<Discount>(this.apiUrl, discount, {
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchAll(): Observable<Discount> {
    return this.http.get<Discount>(this.apiUrl, {
      reportProgress: true,
      observe: 'body',
    });
  }
}
