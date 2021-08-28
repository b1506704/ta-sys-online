import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instructor } from '../../models/instructor';

@Injectable({
  providedIn: 'root',
})
export class InstructorHttpService {
  constructor(private http: HttpClient) {}
  apiInstructorUrl = 'https://ta-sys-online.azurewebsites.net/instructors';
  // apiInstructorUrl = 'http://localhost/instructors';

  fetchInstructor(page: number, size: number): Observable<Instructor> {
    const params = new HttpParams().set('page', page).set('size', size);
    console.log(params.toString());
    return this.http.get<Instructor>(this.apiInstructorUrl, {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchInstructorByName(
    value: string,
    page: number,
    size: number
  ): Observable<Instructor> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Instructor>(
      this.apiInstructorUrl + '/searchByName',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  filterInstructorByPrice(
    criteria: string,
    value: number,
    page: number,
    size: number
  ): Observable<Instructor> {
    const params = new HttpParams()
      .set('criteria', criteria)
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Instructor>(
      this.apiInstructorUrl,
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  filterInstructorByCategory(
    value: string,
    page: number,
    size: number
  ): Observable<Instructor> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Instructor>(
      this.apiInstructorUrl + '/filterByCategory',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  filterInstructorByRole(
    value: string,
    page: number,
    size: number
  ): Observable<Instructor> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Instructor>(
      this.apiInstructorUrl + '/filterByRole',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  filterInstructorByAge(
    value: string,
    page: number,
    size: number
  ): Observable<Instructor> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Instructor>(
      this.apiInstructorUrl + '/filterByAge',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  filterInstructorByGender(
    value: string,
    page: number,
    size: number
  ): Observable<Instructor> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Instructor>(
      this.apiInstructorUrl + '/filterByGender',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  sortInstructorByName(
    value: string,
    page: number,
    size: number
  ): Observable<Instructor> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Instructor>(
      this.apiInstructorUrl + '/sortByName',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  sortInstructorByPrice(
    value: string,
    page: number,
    size: number
  ): Observable<Instructor> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Instructor>(
      this.apiInstructorUrl + '/sortByPrice',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  uploadInstructor(instructor: Instructor): Observable<Instructor> {
    return this.http.post<Instructor>(this.apiInstructorUrl, instructor, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomInstructor(): Observable<Instructor> {
    return this.http.post<Instructor>(
      this.apiInstructorUrl + '/randomInstructor',
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  deleteAllInstructors(): Observable<Instructor> {
    return this.http.post<Instructor>(
      this.apiInstructorUrl + '/deleteAll',
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  deleteInstructor(id: string): Observable<ArrayBuffer> {
    return this.http.delete<ArrayBuffer>(this.apiInstructorUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  getInstructor(id: string): Observable<Instructor> {
    return this.http.get<Instructor>(this.apiInstructorUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  getInstructorByUserName(userName: string): Observable<Instructor> {
    const params = new HttpParams().set('userName', userName);
    console.log(params.toString());
    return this.http.post<Instructor>(
      this.apiInstructorUrl + '/byUserName',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  deleteSelectedInstructors(
    selectedItems: Array<String>
  ): Observable<Array<String>> {
    return this.http.post<Array<String>>(
      this.apiInstructorUrl + '/batch',
      selectedItems,
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  updateInstructor(instructor: Instructor, key: string): Observable<Instructor> {
    return this.http.post<Instructor>(
      this.apiInstructorUrl + `/updateInstructor/${key}`,
      instructor,
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  fetchAll(): Observable<Instructor> {
    return this.http.post<Instructor>(
      this.apiInstructorUrl + `/fetchAll`,
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }
}
