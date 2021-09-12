import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curriculum } from '../../models/curriculum';

@Injectable({
  providedIn: 'root',
})
export class CurriculumHttpService {
  constructor(private http: HttpClient) {}
  apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/CurriCulum';

  fetchCurriculum(page: number, size: number): Observable<Curriculum> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Curriculum>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchCurriculumByLearnerID(
    page: number,
    size: number,
    id: string
  ): Observable<Curriculum> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size)
      .set('Id', id);
    console.log(params.toString());
    return this.http.get<Curriculum>(this.apiUrl + '/byLearnerID', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchCurriculumByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Curriculum> {
    const params = new HttpParams()
      .set('Property', property)
      .set('Value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Curriculum>(this.apiUrl + '/search', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  filterCurriculumByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Curriculum> {
    const params = new HttpParams()
      .set('Value', value)
      .set('Property', property)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Curriculum>(this.apiUrl + '/filter', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  sortCurriculumByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ): Observable<Curriculum> {
    const params = new HttpParams()
      .set('SortBy', value)
      .set('Order', order)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Curriculum>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  uploadCurriculum(curriculum: Curriculum): Observable<Curriculum> {
    return this.http.post<Curriculum>(this.apiUrl, curriculum, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomCurriculum(): Observable<Curriculum> {
    return this.http.post<Curriculum>(this.apiUrl + '/randomCurriculum', {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteCurriculum(id: Array<string>): Observable<Object> {
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

  getCurriculum(id: string): Observable<Curriculum> {
    return this.http.get<Curriculum>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  updateCurriculum(curriculum: Curriculum): Observable<Curriculum> {
    return this.http.put<Curriculum>(this.apiUrl, curriculum, {
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchAll(): Observable<Curriculum> {
    return this.http.get<Curriculum>(this.apiUrl, {
      reportProgress: true,
      observe: 'body',
    });
  }
}
