import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../../models/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentHttpService {
  constructor(private http: HttpClient) {}
  // apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/Comment';
  apiUrl = 'https://localhost:5001';

  fetchComment(page: number, size: number): Observable<Comment> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Comment>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchCommentByLearnerID(
    page: number,
    size: number,
    id: string
  ): Observable<Comment> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size)
      .set('Id', id);
    console.log(params.toString());
    return this.http.get<Comment>(this.apiUrl + '/byLearnerID', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchCommentByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Comment> {
    const params = new HttpParams()
      .set('Property', property)
      .set('Value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Comment>(this.apiUrl + '/search', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  filterCommentByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Comment> {
    const params = new HttpParams()
      .set('Value', value)
      .set('Property', property)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Comment>(this.apiUrl + '/filter', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  sortCommentByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ): Observable<Comment> {
    const params = new HttpParams()
      .set('SortBy', value)
      .set('Order', order)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Comment>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  uploadComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, comment, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomComment(): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl + '/randomComment', {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteComment(id: Array<string>): Observable<Object> {
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

  getComment(id: string): Observable<Comment> {
    return this.http.get<Comment>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  updateComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(this.apiUrl, comment, {
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchAll(): Observable<Comment> {
    return this.http.get<Comment>(this.apiUrl, {
      reportProgress: true,
      observe: 'body',
    });
  }
}
