import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../../models/session';

@Injectable({
  providedIn: 'root',
})
export class SessionHttpService {
  constructor(private http: HttpClient) {}
  // apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/StreamSession';
  apiUrl = 'https://localhost:5001/api/StreamSession';

  fetchSession(page: number, size: number): Observable<Session> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Session>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchSessionByLearnerID(
    page: number,
    size: number,
    id: string
  ): Observable<Session> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size)
      .set('Id', id);
    console.log(params.toString());
    return this.http.get<Session>(this.apiUrl + '/byLearnerID', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchSessionByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Session> {
    const params = new HttpParams()
      .set('Property', property)
      .set('Value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Session>(this.apiUrl + '/search', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  filterSessionByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Session> {
    const params = new HttpParams()
      .set('Value', value)
      .set('Property', property)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Session>(this.apiUrl + '/filter', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  sortSessionByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ): Observable<Session> {
    const params = new HttpParams()
      .set('SortBy', value)
      .set('Order', order)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Session>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  uploadSession(session: Session): Observable<Session> {
    return this.http.post<Session>(this.apiUrl, session, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomSession(): Observable<Session> {
    return this.http.post<Session>(this.apiUrl + '/randomSession', {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteSession(id: Array<string>): Observable<Object> {
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

  getSession(id: string): Observable<Session> {
    return this.http.get<Session>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  updateSession(session: Session): Observable<Session> {
    return this.http.put<Session>(this.apiUrl, session, {
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchAll(): Observable<Session> {
    return this.http.get<Session>(this.apiUrl, {
      reportProgress: true,
      observe: 'body',
    });
  }
}
