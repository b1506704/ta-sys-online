import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../../models/userinfo';

@Injectable({
  providedIn: 'root',
})
export class UserInfoHttpService {
  constructor(private http: HttpClient) {}
  apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/UserInfo';

  fetchUserInfo(page: number, size: number): Observable<UserInfo> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<UserInfo>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchUserInfoByLearnerID(
    page: number,
    size: number,
    id: string
  ): Observable<UserInfo> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size)
      .set('Id', id);
    console.log(params.toString());
    return this.http.get<UserInfo>(this.apiUrl + '/byLearnerID', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchUserInfoByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<UserInfo> {
    const params = new HttpParams()
      .set('Property', property)
      .set('Value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<UserInfo>(this.apiUrl + '/search', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  filterUserInfoByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<UserInfo> {
    const params = new HttpParams()
      .set('Value', value)
      .set('Property', property)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<UserInfo>(this.apiUrl + '/filter', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }  

  sortUserInfoByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ): Observable<UserInfo> {
    const params = new HttpParams()
      .set('SortBy', value)
      .set('Order', order)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<UserInfo>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  uploadUserInfo(userInfo: UserInfo): Observable<UserInfo> {
    return this.http.post<UserInfo>(this.apiUrl, userInfo, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomUserInfo(): Observable<UserInfo> {
    return this.http.post<UserInfo>(this.apiUrl + '/randomUserInfo', {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteUserInfo(id: Array<string>): Observable<Object> {
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

  getUserInfo(id: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  updateUserInfo(userInfo: UserInfo): Observable<UserInfo> {
    return this.http.put<UserInfo>(this.apiUrl, userInfo, {
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchAll(): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.apiUrl, {
      reportProgress: true,
      observe: 'body',
    });
  }
}
