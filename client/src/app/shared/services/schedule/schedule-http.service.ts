import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from '../../models/schedule';

@Injectable({
  providedIn: 'root',
})
export class ScheduleHttpService {
  constructor(private http: HttpClient) {}
  apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/Schedule';

  fetchSchedule(page: number, size: number): Observable<Schedule> {
    const params = new HttpParams().set('page', page).set('size', size);
    console.log(params.toString());
    return this.http.get<Schedule>(this.apiUrl, {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchScheduleByName(
    value: string,
    page: number,
    size: number
  ): Observable<Schedule> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Schedule>(
      this.apiUrl + '/searchByName',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  filterScheduleByPrice(
    criteria: string,
    value: number,
    page: number,
    size: number
  ): Observable<Schedule> {
    const params = new HttpParams()
      .set('criteria', criteria)
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Schedule>(
      this.apiUrl,
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  filterScheduleByCategory(
    value: string,
    page: number,
    size: number
  ): Observable<Schedule> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Schedule>(
      this.apiUrl + '/filterByCategory',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  sortScheduleByName(
    value: string,
    page: number,
    size: number
  ): Observable<Schedule> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Schedule>(
      this.apiUrl + '/sortByName',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  sortScheduleByPrice(
    value: string,
    page: number,
    size: number
  ): Observable<Schedule> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Schedule>(
      this.apiUrl + '/sortByPrice',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  uploadSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(this.apiUrl, schedule, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomSchedule(): Observable<Schedule> {
    return this.http.post<Schedule>(
      this.apiUrl + '/randomSchedule',
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  deleteAllSchedules(): Observable<Schedule> {
    return this.http.post<Schedule>(
      this.apiUrl + '/deleteAll',
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  deleteSchedule(id: string): Observable<ArrayBuffer> {
    return this.http.delete<ArrayBuffer>(this.apiUrl + `/${id}`, {
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

  deleteSelectedSchedules(
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

  updateSchedule(schedule: Schedule, key: string): Observable<Schedule> {
    return this.http.post<Schedule>(
      this.apiUrl + `/updateSchedule/${key}`,
      schedule,
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  fetchAll(): Observable<Schedule> {
    return this.http.post<Schedule>(
      this.apiUrl + `/fetchAll`,
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }
}
