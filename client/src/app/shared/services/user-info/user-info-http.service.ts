import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../../models/userinfo';

@Injectable({
  providedIn: 'root',
})
export class UserInfoHttpService {
  constructor(private http: HttpClient) {}
  // apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/UserInfo';
  apiUrl = 'https://localhost:5001/api/UserInfo';

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
}
