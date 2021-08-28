import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from '../../models/test';

@Injectable({
  providedIn: 'root',
})
export class TestHttpService {
  constructor(private http: HttpClient) {}
  apiTestUrl = 'https://ta-sys-online.azurewebsites.net/tests';
  // apiTestUrl = 'http://localhost/tests';

  fetchTest(page: number, size: number): Observable<Test> {
    const params = new HttpParams().set('page', page).set('size', size);
    console.log(params.toString());
    return this.http.get<Test>(this.apiTestUrl, {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchTestByName(
    value: string,
    page: number,
    size: number
  ): Observable<Test> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Test>(
      this.apiTestUrl + '/searchByName',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  filterTestByPrice(
    criteria: string,
    value: number,
    page: number,
    size: number
  ): Observable<Test> {
    const params = new HttpParams()
      .set('criteria', criteria)
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Test>(
      this.apiTestUrl,
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  filterTestByCategory(
    value: string,
    page: number,
    size: number
  ): Observable<Test> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Test>(
      this.apiTestUrl + '/filterByCategory',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  sortTestByName(
    value: string,
    page: number,
    size: number
  ): Observable<Test> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Test>(
      this.apiTestUrl + '/sortByName',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  sortTestByPrice(
    value: string,
    page: number,
    size: number
  ): Observable<Test> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Test>(
      this.apiTestUrl + '/sortByPrice',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  uploadTest(test: Test): Observable<Test> {
    return this.http.post<Test>(this.apiTestUrl, test, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomTest(): Observable<Test> {
    return this.http.post<Test>(this.apiTestUrl + '/randomTest', {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteAllTests(): Observable<Test> {
    return this.http.post<Test>(this.apiTestUrl + '/deleteAll', {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteTest(id: string): Observable<ArrayBuffer> {
    return this.http.delete<ArrayBuffer>(this.apiTestUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  getTest(id: string): Observable<Test> {
    return this.http.get<Test>(this.apiTestUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteSelectedTests(
    selectedItems: Array<String>
  ): Observable<Array<String>> {
    return this.http.post<Array<String>>(
      this.apiTestUrl + '/batch',
      selectedItems,
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  updateTest(test: Test, key: string): Observable<Test> {
    return this.http.post<Test>(
      this.apiTestUrl + `/updateTest/${key}`,
      test,
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  fetchAll(): Observable<Test> {
    return this.http.post<Test>(
      this.apiTestUrl + `/fetchAll`,
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }
}
