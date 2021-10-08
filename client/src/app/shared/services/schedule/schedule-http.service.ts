import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from '../../models/schedule';

@Injectable({
  providedIn: 'root',
})
export class ScheduleHttpService {
  constructor(private http: HttpClient) {}
  // apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/Schedule';
  apiUrl = 'https://localhost:5001/api/Schedule';

  fetchSchedule(page: number, size: number): Observable<Schedule> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Schedule>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchScheduleByLearnerID(
    page: number,
    size: number,
    id: string
  ): Observable<Schedule> {
    const params = new HttpParams()
      .set('PageNumber', page)
      .set('PageSize', size)
      .set('Id', id);
    console.log(params.toString());
    return this.http.get<Schedule>(this.apiUrl + '/byLearnerID', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchScheduleByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Schedule> {
    const params = new HttpParams()
      .set('Property', property)
      .set('Value', value)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Schedule>(this.apiUrl + '/search', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  filterScheduleByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<Schedule> {
    const params = new HttpParams()
      .set('Value', value)
      .set('Property', property)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Schedule>(this.apiUrl + '/filter', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  sortScheduleByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ): Observable<Schedule> {
    const params = new HttpParams()
      .set('SortBy', value)
      .set('Order', order)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<Schedule>(this.apiUrl + '/paging', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  uploadSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(this.apiUrl, schedule, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomSchedule(): Observable<Schedule> {
    return this.http.post<Schedule>(this.apiUrl + '/randomSchedule', {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteSchedule(id: Array<string>): Observable<Object> {
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

  getSchedule(id: string): Observable<Schedule> {
    return this.http.get<Schedule>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  updateSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(this.apiUrl, schedule, {
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchAll(): Observable<Schedule> {
    return this.http.get<Schedule>(this.apiUrl, {
      reportProgress: true,
      observe: 'body',
    });
  }
}
