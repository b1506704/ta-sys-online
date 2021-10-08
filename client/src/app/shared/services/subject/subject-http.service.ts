import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../../models/subject';

@Injectable({
  providedIn: 'root',
})
export class SubjectHttpService {
  constructor(private http: HttpClient) {}
  // apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/Subject';
  apiUrl = 'https://localhost:5001/api/Subject';

  fetchSubject(page: number, size: number): Observable<Subject> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Subject>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchSubjectByLearnerID(
    page: number,
    size: number,
    id: string
  ): Observable<Subject> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size)
      .set('Id', id);
    console.log(params.toString());
    return this.http.get<Subject>(this.apiUrl + '/byLearnerID', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchSubjectByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Subject> {
    const params = new HttpParams()
      .set('Property', property)
      .set('Value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Subject>(this.apiUrl + '/search', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  filterSubjectByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Subject> {
    const params = new HttpParams()
      .set('Property', property)
      .set('Value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Subject>(this.apiUrl, {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  sortSubjectByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ): Observable<Subject> {
    const params = new HttpParams()
      .set('SortBy', value)
      .set('Order', order)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Subject>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  uploadSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(this.apiUrl, subject, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomSubject(): Observable<Subject> {
    return this.http.post<Subject>(this.apiUrl + '/randomSubject', {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteAllSubjects(): Observable<Subject> {
    return this.http.post<Subject>(this.apiUrl + '/deleteAll', {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteSubject(subjectId: string): Observable<ArrayBuffer> {
    const params = new HttpParams().set('subjectId', subjectId);
    return this.http.delete<ArrayBuffer>(this.apiUrl, {
      reportProgress: true,
      params: params,
      observe: 'body',
    });
  }

  getSubject(id: string): Observable<Subject> {
    return this.http.get<Subject>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteSelectedSubjects(
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

  updateSubject(subject: Subject): Observable<Subject> {
    return this.http.put<Subject>(this.apiUrl, subject, {
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchAll(): Observable<Subject> {
    return this.http.get<Subject>(this.apiUrl, {
      reportProgress: true,
      observe: 'body',
    });
  }
}
