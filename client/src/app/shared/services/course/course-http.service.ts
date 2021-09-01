import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../models/course';

@Injectable({
  providedIn: 'root',
})
export class CourseHttpService {
  constructor(private http: HttpClient) {}
  apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/Course';

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

  fetchCourseByLearnerID(
    page: number,
    size: number,
    learnerID: string
  ): Observable<Course> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size)
      .set('learnerID', learnerID);
    console.log(params.toString());
    return this.http.get<Course>(this.apiUrl + '/byLearnerID', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchCourseByName(
    value: string,
    page: number,
    size: number
  ): Observable<Course> {
    const params = new HttpParams()
      .set('value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.post<Course>(
      this.apiUrl + '/searchByName',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  filterCourseByPrice(
    criteria: string,
    value: number,
    page: number,
    size: number
  ): Observable<Course> {
    const params = new HttpParams()
      .set('criteria', criteria)
      .set('value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.post<Course>(
      this.apiUrl,
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  filterCourseByCategory(
    value: string,
    page: number,
    size: number
  ): Observable<Course> {
    const params = new HttpParams()
      .set('value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.post<Course>(
      this.apiUrl + '/filterByCategory',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  sortCourseByName(
    value: string,
    page: number,
    size: number
  ): Observable<Course> {
    const params = new HttpParams()
      .set('value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.post<Course>(
      this.apiUrl + '/sortByName',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  sortCourseByPrice(
    value: string,
    page: number,
    size: number
  ): Observable<Course> {
    const params = new HttpParams()
      .set('value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.post<Course>(
      this.apiUrl + '/sortByPrice',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  uploadCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomCourse(): Observable<Course> {
    return this.http.post<Course>(this.apiUrl + '/randomCourse', {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteAllCourses(): Observable<Course> {
    return this.http.post<Course>(this.apiUrl + '/deleteAll', {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteCourse(id: string): Observable<ArrayBuffer> {
    return this.http.delete<ArrayBuffer>(this.apiUrl + `/${id}`, {
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

  getCourseByMedicalCheckupID(medicalCheckupID: string): Observable<Course> {
    const params = new HttpParams().set('medicalCheckupID', medicalCheckupID);
    console.log(params.toString());
    return this.http.post<Course>(
      this.apiUrl + '/byMedicalCheckupID',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  deleteSelectedCourses(
    selectedItems: Array<string>
  ): Observable<Array<string>> {
    return this.http.post<Array<string>>(
      this.apiUrl + '/batch',
      selectedItems,
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  updateCourse(course: Course, key: string): Observable<Course> {
    return this.http.post<Course>(
      this.apiUrl + `/updateCourse/${key}`,
      course,
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  fetchAll(): Observable<Course> {
    return this.http.get<Course>(this.apiUrl, {
      reportProgress: true,
      observe: 'body',
    });
  }
}
