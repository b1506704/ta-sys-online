import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../models/course';

@Injectable({
  providedIn: 'root',
})
export class CourseHttpService {
  constructor(private http: HttpClient) {}
  apiCourseUrl = 'https://ta-sys-online.azurewebsites.net/courses';
  // apiCourseUrl = 'http://localhost/courses';

  fetchCourse(page: number, size: number): Observable<Course> {
    const params = new HttpParams().set('page', page).set('size', size);
    console.log(params.toString());
    return this.http.get<Course>(this.apiCourseUrl, {
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
      .set('page', page)
      .set('size', size)
      .set('learnerID', learnerID);
    console.log(params.toString());
    return this.http.get<Course>(
      this.apiCourseUrl + '/byLearnerID',
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  searchCourseByName(
    value: string,
    page: number,
    size: number
  ): Observable<Course> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Course>(
      this.apiCourseUrl + '/searchByName',
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
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Course>(
      this.apiCourseUrl,
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
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Course>(
      this.apiCourseUrl + '/filterByCategory',
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
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Course>(
      this.apiCourseUrl + '/sortByName',
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
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Course>(
      this.apiCourseUrl + '/sortByPrice',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  uploadCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiCourseUrl, course, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomCourse(): Observable<Course> {
    return this.http.post<Course>(this.apiCourseUrl + '/randomCourse', {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteAllCourses(): Observable<Course> {
    return this.http.post<Course>(this.apiCourseUrl + '/deleteAll', {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteCourse(id: string): Observable<ArrayBuffer> {
    return this.http.delete<ArrayBuffer>(this.apiCourseUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  getCourse(id: string): Observable<Course> {
    return this.http.get<Course>(this.apiCourseUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  getCourseByMedicalCheckupID(medicalCheckupID: string): Observable<Course> {
    const params = new HttpParams().set('medicalCheckupID', medicalCheckupID);
    console.log(params.toString());
    return this.http.post<Course>(
      this.apiCourseUrl + '/byMedicalCheckupID',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  deleteSelectedCourses(
    selectedItems: Array<String>
  ): Observable<Array<String>> {
    return this.http.post<Array<String>>(
      this.apiCourseUrl + '/batch',
      selectedItems,
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  updateCourse(course: Course, key: string): Observable<Course> {
    return this.http.post<Course>(
      this.apiCourseUrl + `/updateCourse/${key}`,
      course,
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  fetchAll(): Observable<Course> {
    return this.http.post<Course>(
      this.apiCourseUrl + `/fetchAll`,
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }
}
