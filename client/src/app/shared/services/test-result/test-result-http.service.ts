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
}
