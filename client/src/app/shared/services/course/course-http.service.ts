import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../models/course';

@Injectable({
  providedIn: 'root',
})
export class CourseHttpService {
  constructor(private http: HttpClient) {}
  // apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/Course';
  apiUrl = 'https://localhost:5001/api/Course';
  apiUserAccountUrl = 'https://localhost:5001';

  fetchCourse(page: number, size: number): Observable<Course> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Course>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchUserCourse(
    page: number,
    size: number,
    userId: string
  ): Observable<Course> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Course>(
      this.apiUserAccountUrl + `/api/UserAccount/${userId}/courses`,
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  searchCourseByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Course> {
    const params = new HttpParams()
      .set('Property', property)
      .set('Value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Course>(this.apiUrl + '/search', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  filterCourseByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Course> {
    const params = new HttpParams()
      .set('Value', value)
      .set('Property', property)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Course>(this.apiUrl + '/filter', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  filterSearchCourseByProperty(
    filterProperty: string,
    filterValue: string,
    searchProperty: string,
    searchValue: string,
    page: number,
    size: number
  ): Observable<Course> {
    const params = new HttpParams()
      .set('FilterValue', filterValue)
      .set('FilterProperty', filterProperty)
      .set('SearchValue', searchValue)
      .set('SearchProperty', searchProperty)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Course>(this.apiUrl + '/filter-search', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  sortCourseByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ): Observable<Course> {
    const params = new HttpParams()
      .set('SortBy', value)
      .set('Order', order)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Course>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  uploadCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course, {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteCourse(id: Array<string>): Observable<Object> {
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

  getCourse(id: string): Observable<Course> {
    return this.http.get<Course>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(this.apiUrl, course, {
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchAll(): Observable<Course> {
    return this.http.get<Course>(this.apiUrl, {
      reportProgress: true,
      observe: 'body',
    });
  }
}
