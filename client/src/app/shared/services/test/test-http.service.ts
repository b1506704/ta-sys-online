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
    const params = new HttpParams().set('page', page).set('size', size);
    console.log(params.toString());
    return this.http.get<Test>(this.apiUrl, {
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
      this.apiUrl + '/searchByName',
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
      this.apiUrl,
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
      this.apiUrl + '/filterByCategory',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  sortTestByName(value: string, page: number, size: number): Observable<Test> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Test>(
      this.apiUrl + '/sortByName',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  sortTestByPrice(value: string, page: number, size: number): Observable<Test> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Test>(
      this.apiUrl + '/sortByPrice',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
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

  deleteAllTests(): Observable<Test> {
    return this.http.post<Test>(this.apiUrl + '/deleteAll', {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteTest(id: string): Observable<ArrayBuffer> {
    return this.http.delete<ArrayBuffer>(this.apiUrl + `/${id}`, {
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

  deleteSelectedTests(selectedItems: Array<string>): Observable<Array<string>> {
    return this.http.post<Array<string>>(
      this.apiUrl + '/batch',
      selectedItems,
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  updateTest(test: Test, key: string): Observable<Test> {
    return this.http.post<Test>(this.apiUrl + `/updateTest/${key}`, test, {
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchAll(): Observable<Test> {
    return this.http.post<Test>(
      this.apiUrl + `/fetchAll`,
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }
}
