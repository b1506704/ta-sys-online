import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TestResult } from '../../models/test-result';

@Injectable({
  providedIn: 'root',
})
export class TestResultHttpService {
  constructor(private http: HttpClient) {}
  // apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/TestResult';
  apiUrl = 'https://localhost:5001/api/TestResult';

  fetchTestResult(page: number, size: number): Observable<TestResult> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<TestResult>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  getOwnTestResult(userId: string, testId: string): Observable<TestResult> {
    return this.http.post<TestResult>(
      this.apiUrl + `/${userId}/test/${testId}`,
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  fetchTestResultByLearnerID(
    page: number,
    size: number,
    id: string
  ): Observable<TestResult> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size)
      .set('Id', id);
    console.log(params.toString());
    return this.http.get<TestResult>(this.apiUrl + '/byLearnerID', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchTestResultByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<TestResult> {
    const params = new HttpParams()
      .set('Property', property)
      .set('Value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<TestResult>(this.apiUrl + '/search', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  filterTestResultByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<TestResult> {
    const params = new HttpParams()
      .set('Value', value)
      .set('Property', property)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<TestResult>(this.apiUrl + '/filter', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  filterSearchTestResultByProperty(
    filterProperty: string,
    filterValue: string,
    searchProperty: string,
    searchValue: string,
    page: number,
    size: number
  ): Observable<TestResult> {
    const params = new HttpParams()
      .set('FilterValue', filterValue)
      .set('FilterProperty', filterProperty)
      .set('SearchValue', searchValue)
      .set('SearchProperty', searchProperty)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<TestResult>(this.apiUrl + '/filter-search', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  sortTestResultByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ): Observable<TestResult> {
    const params = new HttpParams()
      .set('SortBy', value)
      .set('Order', order)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<TestResult>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  uploadTestResult(test: TestResult): Observable<TestResult> {
    return this.http.post<TestResult>(this.apiUrl, test, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomTestResult(): Observable<TestResult> {
    return this.http.post<any>(
      'https://localhost:5001/api/Generate/generate-test-data',
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  deleteTestResult(id: Array<string>): Observable<Object> {
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

  getTestResult(id: string): Observable<TestResult> {
    return this.http.get<TestResult>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  updateTestResult(test: TestResult): Observable<TestResult> {
    return this.http.put<TestResult>(this.apiUrl, test, {
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchAll(): Observable<TestResult> {
    return this.http.get<TestResult>(this.apiUrl, {
      reportProgress: true,
      observe: 'body',
    });
  }
}
