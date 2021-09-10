import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostHttpService {
  constructor(private http: HttpClient) {}
  apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/Post';

  fetchPost(page: number, size: number): Observable<Post> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Post>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchPostByLearnerID(
    page: number,
    size: number,
    id: string
  ): Observable<Post> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size)
      .set('Id', id);
    console.log(params.toString());
    return this.http.get<Post>(this.apiUrl + '/byLearnerID', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchPostByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Post> {
    const params = new HttpParams()
      .set('Property', property)
      .set('Value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Post>(this.apiUrl + '/search', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  filterPostByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Post> {
    const params = new HttpParams()
      .set('Value', value)
      .set('Property', property)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Post>(this.apiUrl + '/filter', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  sortPostByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ): Observable<Post> {
    const params = new HttpParams()
      .set('SortBy', value)
      .set('Order', order)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Post>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  uploadPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomPost(): Observable<Post> {
    return this.http.post<Post>(this.apiUrl + '/randomPost', {
      reportProgress: true,
      observe: 'body',
    });
  }

  deletePost(id: Array<string>): Observable<Object> {
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

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(this.apiUrl, post, {
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchAll(): Observable<Post> {
    return this.http.get<Post>(this.apiUrl, {
      reportProgress: true,
      observe: 'body',
    });
  }
}
