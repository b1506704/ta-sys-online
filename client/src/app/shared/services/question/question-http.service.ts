import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../../models/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionHttpService {
  constructor(private http: HttpClient) {}
  // apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/Question';
  apiUrl = 'https://localhost:5001/api/Question';

  fetchQuestion(page: number, size: number): Observable<Question> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Question>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }
  searchQuestionByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Question> {
    const params = new HttpParams()
      .set('Property', property)
      .set('Value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Question>(this.apiUrl + '/search', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  filterQuestionByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Question> {
    const params = new HttpParams()
      .set('Value', value)
      .set('Property', property)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Question>(this.apiUrl + '/filter', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  filterSearchQuestionByProperty(
    filterProperty: string,
    filterValue: string,
    searchProperty: string,
    searchValue: string,
    page: number,
    size: number
  ): Observable<Question> {
    const params = new HttpParams()
      .set('FilterValue', filterValue)
      .set('FilterProperty', filterProperty)
      .set('SearchValue', searchValue)
      .set('SearchProperty', searchProperty)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Question>(this.apiUrl + '/filter-search', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  sortQuestionByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ): Observable<Question> {
    const params = new HttpParams()
      .set('SortBy', value)
      .set('Order', order)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Question>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  uploadQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.apiUrl, question, {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteQuestion(id: Array<string>): Observable<Object> {
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
  updateQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(this.apiUrl, question, {
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchAll(): Observable<Question> {
    return this.http.get<Question>(this.apiUrl, {
      reportProgress: true,
      observe: 'body',
    });
  }
}
