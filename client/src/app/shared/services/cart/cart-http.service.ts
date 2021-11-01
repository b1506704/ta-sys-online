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

  fetchCart(page: number, size: number): Observable<Cart> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Cart>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchCartByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Cart> {
    const params = new HttpParams()
      .set('Property', property)
      .set('Value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Cart>(this.apiUrl + '/search', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  filterCartByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Cart> {
    const params = new HttpParams()
      .set('Value', value)
      .set('Property', property)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Cart>(this.apiUrl + '/filter', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  sortCartByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ): Observable<Cart> {
    const params = new HttpParams()
      .set('SortBy', value)
      .set('Order', order)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Cart>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  uploadCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.apiUrl, cart, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomCart(): Observable<Cart> {
    return this.http.post<any>(
      'https://localhost:5001/api/Generate/generate-cart-data',
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  deleteCart(id: Array<string>): Observable<Object> {
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

  getCart(userId: string): Observable<Cart> {
    return this.http.get<Cart>(this.apiUrl + `/${userId}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  updateCart(cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(this.apiUrl, cart, {
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

  fetchAll(): Observable<Cart> {
    return this.http.get<Cart>(this.apiUrl, {
      reportProgress: true,
      observe: 'body',
    });
  }
}
