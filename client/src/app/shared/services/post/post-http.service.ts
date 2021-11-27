import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostHttpService {
  constructor(private http: HttpClient) {}
  // apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/Post';
  apiUrl = 'https://localhost:5001/api/Post';
  apiPostLikeUrl = 'https://localhost:5001/api/PostLike';

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

  filterSearchPostByProperty(
    filterProperty: string,
    filterValue: string,
    searchProperty: string,
    searchValue: string,
    page: number,
    size: number
  ): Observable<Post> {
    const params = new HttpParams()
      .set('FilterValue', filterValue)
      .set('FilterProperty', filterProperty)
      .set('SearchValue', searchValue)
      .set('SearchProperty', searchProperty)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Post>(this.apiUrl + '/filter-search', {
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

  likePost(postId: string, userAccountId: string): Observable<any> {
    return this.http.post<any>(
      this.apiPostLikeUrl,
      { postId, userAccountId },
      {
        reportProgress: true,
        observe: 'body',
      }
    );
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
