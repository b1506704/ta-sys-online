import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Learner } from '../../models/learner';

@Injectable({
  providedIn: 'root',
})
export class LearnerHttpService {
  constructor(private http: HttpClient) {}
  // apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/Learner';
  apiUrl = 'https://localhost:5001/api/Learner';

  fetchLearner(page: number, size: number): Observable<Learner> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Learner>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchLearnerByLearnerID(
    page: number,
    size: number,
    id: string
  ): Observable<Learner> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size)
      .set('Id', id);
    console.log(params.toString());
    return this.http.get<Learner>(this.apiUrl + '/byLearnerID', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchLearnerByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Learner> {
    const params = new HttpParams()
      .set('Property', property)
      .set('Value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Learner>(this.apiUrl + '/search', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  filterLearnerByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Learner> {
    const params = new HttpParams()
      .set('Value', value)
      .set('Property', property)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Learner>(this.apiUrl + '/filter', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  sortLearnerByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ): Observable<Learner> {
    const params = new HttpParams()
      .set('SortBy', value)
      .set('Order', order)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Learner>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  uploadLearner(learner: Learner): Observable<Learner> {
    return this.http.post<Learner>(this.apiUrl, learner, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomLearner(): Observable<Learner> {
    return this.http.post<Learner>(this.apiUrl + '/randomLearner', {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteLearner(id: Array<string>): Observable<Object> {
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

  getLearner(id: string): Observable<Learner> {
    return this.http.get<Learner>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  updateLearner(learner: Learner): Observable<Learner> {
    return this.http.put<Learner>(this.apiUrl, learner, {
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchAll(): Observable<Learner> {
    return this.http.get<Learner>(this.apiUrl, {
      reportProgress: true,
      observe: 'body',
    });
  }
}
