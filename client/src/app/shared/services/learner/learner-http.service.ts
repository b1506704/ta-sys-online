import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Learner } from '../../models/learner';

@Injectable({
  providedIn: 'root',
})
export class LearnerHttpService {
  constructor(private http: HttpClient) {}
  apiLearnerUrl = 'https://ta-sys-online.azurewebsites.net/learners';
  // apiLearnerUrl = 'http://localhost/learners';

  fetchLearner(page: number, size: number): Observable<Learner> {
    const params = new HttpParams().set('page', page).set('size', size);
    console.log(params.toString());
    return this.http.get<Learner>(this.apiLearnerUrl, {
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
      this.apiLearnerUrl + '/searchByName',
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
      this.apiLearnerUrl,
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
      this.apiLearnerUrl + '/filterByCategory',
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
      this.apiLearnerUrl + '/filterByJob',
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
      this.apiLearnerUrl + '/filterByGender',
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
      this.apiLearnerUrl + '/sortByName',
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
      this.apiLearnerUrl + '/sortByPrice',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  uploadLearner(learner: Learner): Observable<Learner> {
    return this.http.post<Learner>(this.apiLearnerUrl, learner, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomLearner(): Observable<Learner> {
    return this.http.post<Learner>(
      this.apiLearnerUrl + '/randomLearner',
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  deleteAllLearners(): Observable<Learner> {
    return this.http.post<Learner>(
      this.apiLearnerUrl + '/deleteAll',
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  deleteLearner(id: string): Observable<ArrayBuffer> {
    return this.http.delete<ArrayBuffer>(this.apiLearnerUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  getLearner(id: string): Observable<Learner> {
    return this.http.get<Learner>(this.apiLearnerUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  getLearnerByUserName(userName: string): Observable<Learner> {
    const params = new HttpParams().set('userName', userName);
    console.log(params.toString());
    return this.http.post<Learner>(
      this.apiLearnerUrl + '/byUserName',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  deleteSelectedLearners(
    selectedItems: Array<String>
  ): Observable<Array<String>> {
    return this.http.post<Array<String>>(
      this.apiLearnerUrl + '/batch',
      selectedItems,
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  updateLearner(learner: Learner, key: string): Observable<Learner> {
    return this.http.post<Learner>(
      this.apiLearnerUrl + `/updateLearner/${key}`,
      learner,
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  fetchAll(): Observable<Learner> {
    return this.http.post<Learner>(
      this.apiLearnerUrl + `/fetchAll`,
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }
}
