import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../../models/message';

@Injectable({
  providedIn: 'root',
})
export class MessageHttpService {
  constructor(private http: HttpClient) {}
  // apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/Message';
  apiUrl = 'https://localhost:5001/api/Message';

  fetchMessage(page: number, size: number): Observable<Message> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Message>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchMessageByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Message> {
    const params = new HttpParams()
      .set('Property', property)
      .set('Value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Message>(this.apiUrl + '/search', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  filterMessageByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Message> {
    const params = new HttpParams()
      .set('Value', value)
      .set('Property', property)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Message>(this.apiUrl + '/filter', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  sortMessageByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ): Observable<Message> {
    const params = new HttpParams()
      .set('SortBy', value)
      .set('Order', order)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Message>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  uploadMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, message, {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteMessage(id: Array<string>): Observable<Object> {
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

  updateMessage(message: Message): Observable<Message> {
    return this.http.put<Message>(this.apiUrl, message, {
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchAll(): Observable<Message> {
    return this.http.get<Message>(this.apiUrl, {
      reportProgress: true,
      observe: 'body',
    });
  }
}
