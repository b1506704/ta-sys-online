import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from '../../models/test';

@Injectable({
  providedIn: 'root',
})
export class TestHttpService {
  constructor(private http: HttpClient) {}
  apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/Test';

  fetchTest(page: number, size: number): Observable<Test> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Test>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchTestByLearnerID(
    page: number,
    size: number,
    id: string
  ): Observable<Test> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size)
      .set('Id', id);
    console.log(params.toString());
    return this.http.get<Test>(this.apiUrl + '/byLearnerID', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchTestByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Test> {
    const params = new HttpParams()
      .set('Property', property)
      .set('Value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Test>(this.apiUrl + '/search', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  filterTestByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Test> {
    const params = new HttpParams()
      .set('Value', value)
      .set('Property', property)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Test>(this.apiUrl + '/filter', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  sortTestByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ): Observable<Test> {
    const params = new HttpParams()
      .set('SortBy', value)
      .set('Order', order)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Test>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  uploadTest(test: Test): Observable<Test> {
    return this.http.post<Test>(this.apiUrl, test, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomTest(): Observable<Test> {
    return this.http.post<Test>(this.apiUrl + '/randomTest', {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteTest(id: Array<string>): Observable<Object> {
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

  getTest(id: string): Observable<Test> {
    return this.http.get<Test>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  updateTest(test: Test): Observable<Test> {
    return this.http.put<Test>(this.apiUrl, test, {
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchAll(): Observable<Test> {
    return this.http.get<Test>(this.apiUrl, {
      reportProgress: true,
      observe: 'body',
    });
  }
}
