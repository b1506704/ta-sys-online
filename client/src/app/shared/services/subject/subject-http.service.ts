import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../../models/subject';

@Injectable({
  providedIn: 'root',
})
export class SubjectHttpService {
  constructor(private http: HttpClient) {}
  apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/Subject';

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
    learnerID: string
  ): Observable<Subject> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size)
      .set('learnerID', learnerID);
    console.log(params.toString());
    return this.http.get<Subject>(this.apiUrl + '/byLearnerID', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchSubjectByName(
    value: string,
    page: number,
    size: number
  ): Observable<Subject> {
    const params = new HttpParams()
      .set('value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.post<Subject>(
      this.apiUrl + '/searchByName',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  filterSubjectByPrice(
    criteria: string,
    value: number,
    page: number,
    size: number
  ): Observable<Subject> {
    const params = new HttpParams()
      .set('criteria', criteria)
      .set('value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.post<Subject>(
      this.apiUrl,
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  filterSubjectByCategory(
    value: string,
    page: number,
    size: number
  ): Observable<Subject> {
    const params = new HttpParams()
      .set('value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.post<Subject>(
      this.apiUrl + '/filterByCategory',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  sortSubjectByName(
    value: string,
    page: number,
    size: number
  ): Observable<Subject> {
    const params = new HttpParams()
      .set('value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.post<Subject>(
      this.apiUrl + '/sortByName',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  sortSubjectByPrice(
    value: string,
    page: number,
    size: number
  ): Observable<Subject> {
    const params = new HttpParams()
      .set('value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.post<Subject>(
      this.apiUrl + '/sortByPrice',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
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

  deleteSubject(id: string): Observable<ArrayBuffer> {
    return this.http.delete<ArrayBuffer>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  getSubject(id: string): Observable<Subject> {
    return this.http.get<Subject>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  getSubjectByMedicalCheckupID(medicalCheckupID: string): Observable<Subject> {
    const params = new HttpParams().set('medicalCheckupID', medicalCheckupID);
    console.log(params.toString());
    return this.http.post<Subject>(
      this.apiUrl + '/byMedicalCheckupID',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
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

  updateSubject(subject: Subject, key: string): Observable<Subject> {
    return this.http.post<Subject>(
      this.apiUrl + `/updateSubject/${key}`,
      subject,
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  fetchAll(): Observable<Subject> {
    return this.http.get<Subject>(this.apiUrl, {
      reportProgress: true,
      observe: 'body',
    });
  }
}