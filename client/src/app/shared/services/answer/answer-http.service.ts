import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../../models/answer';

@Injectable({
  providedIn: 'root',
})
export class AnswerHttpService {
  constructor(private http: HttpClient) {}
  // apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/Answer';
  apiUrl = 'https://localhost:5001/api/Answer';

  fetchAnswer(page: number, size: number): Observable<Answer> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Answer>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchAnswerByLearnerID(
    page: number,
    size: number,
    id: string
  ): Observable<Answer> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size)
      .set('Id', id);
    console.log(params.toString());
    return this.http.get<Answer>(this.apiUrl + '/byLearnerID', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchAnswerByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Answer> {
    const params = new HttpParams()
      .set('Property', property)
      .set('Value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Answer>(this.apiUrl + '/search', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  filterAnswerByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Answer> {
    const params = new HttpParams()
      .set('Value', value)
      .set('Property', property)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Answer>(this.apiUrl + '/filter', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  sortAnswerByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ): Observable<Answer> {
    const params = new HttpParams()
      .set('SortBy', value)
      .set('Order', order)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Answer>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  uploadAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(this.apiUrl, answer, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomAnswer(): Observable<Answer> {
    return this.http.post<Answer>(this.apiUrl + '/randomAnswer', {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteAnswer(id: Array<string>): Observable<Object> {
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

  getAnswer(id: string): Observable<Answer> {
    return this.http.get<Answer>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  updateAnswer(answer: Answer): Observable<Answer> {
    return this.http.put<Answer>(this.apiUrl, answer, {
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchAll(): Observable<Answer> {
    return this.http.get<Answer>(this.apiUrl, {
      reportProgress: true,
      observe: 'body',
    });
  }
}
