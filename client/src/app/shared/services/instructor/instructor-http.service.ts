import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instructor } from '../../models/instructor';

@Injectable({
  providedIn: 'root',
})
export class InstructorHttpService {
  constructor(private http: HttpClient) {}
  apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/Instructor';

  fetchInstructor(page: number, size: number): Observable<Instructor> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Instructor>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchInstructorByLearnerID(
    page: number,
    size: number,
    id: string
  ): Observable<Instructor> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size)
      .set('Id', id);
    console.log(params.toString());
    return this.http.get<Instructor>(this.apiUrl + '/byLearnerID', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchInstructorByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Instructor> {
    const params = new HttpParams()
      .set('Property', property)
      .set('Value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Instructor>(this.apiUrl + '/search', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  filterInstructorByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Instructor> {
    const params = new HttpParams()
      .set('Value', value)
      .set('Property', property)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Instructor>(this.apiUrl + '/filter', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  sortInstructorByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ): Observable<Instructor> {
    const params = new HttpParams()
      .set('SortBy', value)
      .set('Order', order)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Instructor>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  uploadInstructor(instructor: Instructor): Observable<Instructor> {
    return this.http.post<Instructor>(this.apiUrl, instructor, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomInstructor(): Observable<Instructor> {
    return this.http.post<Instructor>(this.apiUrl + '/randomInstructor', {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteInstructor(id: Array<string>): Observable<Object> {
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

  getInstructor(id: string): Observable<Instructor> {
    return this.http.get<Instructor>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  updateInstructor(instructor: Instructor): Observable<Instructor> {
    return this.http.put<Instructor>(this.apiUrl, instructor, {
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchAll(): Observable<Instructor> {
    return this.http.get<Instructor>(this.apiUrl, {
      reportProgress: true,
      observe: 'body',
    });
  }
}
