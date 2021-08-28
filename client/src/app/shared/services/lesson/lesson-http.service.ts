import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../../models/lesson';

@Injectable({
  providedIn: 'root',
})
export class LessonHttpService {
  constructor(private http: HttpClient) {}
  apiLessonUrl = 'https://ta-sys-online.azurewebsites.net/lessons';
  // apiLessonUrl = 'http://localhost/lessons';

  fetchLesson(page: number, size: number): Observable<Lesson> {
    const params = new HttpParams().set('page', page).set('size', size);
    console.log(params.toString());
    return this.http.get<Lesson>(this.apiLessonUrl, {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchLessonByName(
    value: string,
    page: number,
    size: number
  ): Observable<Lesson> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Lesson>(
      this.apiLessonUrl + '/searchByName',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  filterLessonByPrice(
    criteria: string,
    value: number,
    page: number,
    size: number
  ): Observable<Lesson> {
    const params = new HttpParams()
      .set('criteria', criteria)
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Lesson>(
      this.apiLessonUrl,
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  filterLessonByCategory(
    value: string,
    page: number,
    size: number
  ): Observable<Lesson> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Lesson>(
      this.apiLessonUrl + '/filterByCategory',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  sortLessonByName(
    value: string,
    page: number,
    size: number
  ): Observable<Lesson> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Lesson>(
      this.apiLessonUrl + '/sortByName',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  sortLessonByPrice(
    value: string,
    page: number,
    size: number
  ): Observable<Lesson> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Lesson>(
      this.apiLessonUrl + '/sortByPrice',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  uploadLesson(lesson: Lesson): Observable<Lesson> {
    return this.http.post<Lesson>(this.apiLessonUrl, lesson, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomLesson(): Observable<Lesson> {
    return this.http.post<Lesson>(this.apiLessonUrl + '/randomLesson', {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteAllLessons(): Observable<Lesson> {
    return this.http.post<Lesson>(this.apiLessonUrl + '/deleteAll', {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteLesson(id: string): Observable<ArrayBuffer> {
    return this.http.delete<ArrayBuffer>(this.apiLessonUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  getLesson(id: string): Observable<Lesson> {
    return this.http.get<Lesson>(this.apiLessonUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteSelectedLessons(
    selectedItems: Array<String>
  ): Observable<Array<String>> {
    return this.http.post<Array<String>>(
      this.apiLessonUrl + '/batch',
      selectedItems,
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  updateLesson(lesson: Lesson, key: string): Observable<Lesson> {
    return this.http.post<Lesson>(
      this.apiLessonUrl + `/updateLesson/${key}`,
      lesson,
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  fetchAll(): Observable<Lesson> {
    return this.http.post<Lesson>(
      this.apiLessonUrl + `/fetchAll`,
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }
}
