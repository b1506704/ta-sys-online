import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Learner } from '../../models/learner';

@Injectable({
  providedIn: 'root',
})
export class LearnerHttpService {
  constructor(private http: HttpClient) {}
  apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/Learner';

  fetchLearner(page: number, size: number): Observable<Learner> {
    const params = new HttpParams().set('page', page).set('size', size);
    console.log(params.toString());
    return this.http.get<Learner>(this.apiUrl, {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchLearnerByName(
    value: string,
    page: number,
    size: number
  ): Observable<Learner> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Learner>(
      this.apiUrl + '/searchByName',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  filterLearnerByPrice(
    criteria: string,
    value: number,
    page: number,
    size: number
  ): Observable<Learner> {
    const params = new HttpParams()
      .set('criteria', criteria)
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Learner>(
      this.apiUrl,
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  filterLearnerByCategory(
    value: string,
    page: number,
    size: number
  ): Observable<Learner> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Learner>(
      this.apiUrl + '/filterByCategory',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  filterLearnerByJob(
    value: string,
    page: number,
    size: number
  ): Observable<Learner> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Learner>(
      this.apiUrl + '/filterByJob',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  filterLearnerByGender(
    value: string,
    page: number,
    size: number
  ): Observable<Learner> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Learner>(
      this.apiUrl + '/filterByGender',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  sortLearnerByName(
    value: string,
    page: number,
    size: number
  ): Observable<Learner> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Learner>(
      this.apiUrl + '/sortByName',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  sortLearnerByPrice(
    value: string,
    page: number,
    size: number
  ): Observable<Learner> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Learner>(
      this.apiUrl + '/sortByPrice',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  uploadLearner(learner: Learner): Observable<Learner> {
    return this.http.post<Learner>(this.apiUrl, learner, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomLearner(): Observable<Learner> {
    return this.http.post<Learner>(
      this.apiUrl + '/randomLearner',
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  deleteAllLearners(): Observable<Learner> {
    return this.http.post<Learner>(
      this.apiUrl + '/deleteAll',
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  deleteLearner(id: string): Observable<ArrayBuffer> {
    return this.http.delete<ArrayBuffer>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  getLearner(id: string): Observable<Learner> {
    return this.http.get<Learner>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  getLearnerByUserName(username: string): Observable<Learner> {
    const params = new HttpParams().set('username', username);
    console.log(params.toString());
    return this.http.post<Learner>(
      this.apiUrl + '/byUserName',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  deleteSelectedLearners(
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

  updateLearner(learner: Learner, key: string): Observable<Learner> {
    return this.http.post<Learner>(
      this.apiUrl + `/updateLearner/${key}`,
      learner,
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  fetchAll(): Observable<Learner> {
    return this.http.post<Learner>(
      this.apiUrl + `/fetchAll`,
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }
}
