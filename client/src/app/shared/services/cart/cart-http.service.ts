import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../../models/cart';
import { Course } from '../../models/course';

@Injectable({
  providedIn: 'root',
})
export class CartHttpService {
  constructor(private http: HttpClient) {}
  // apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/Cart';
  apiUrl = 'https://localhost:5001/api/Cart';

  getCart(userId: string): Observable<Cart> {
    return this.http.get<Cart>(this.apiUrl + `/${userId}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  addToCart(course: Course, userId: string): Observable<Cart> {
    const params = new HttpParams().set('userId', userId);
    return this.http.put<Cart>(this.apiUrl + `/${userId}/add-to-cart`, course, {
      reportProgress: true,
      observe: 'body',
      params: params,
    });
  }

  removeFromCart(course: Course, userId: string): Observable<Cart> {
    const params = new HttpParams().set('userId', userId);
    return this.http.put<Cart>(
      this.apiUrl + `/${userId}/remove-from-cart`,
      course,
      {
        reportProgress: true,
        observe: 'body',
        params: params,
      }
    );
  }

  removeAllFromCart(userId: string): Observable<ArrayBuffer> {
    const params = new HttpParams().set('userId', userId);
    return this.http.delete<ArrayBuffer>(
      this.apiUrl + `/${userId}/remove-all-from-cart`,
      {
        reportProgress: true,
        observe: 'body',
        params: params,
      }
    );
  }
}
