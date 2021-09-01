import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instructor } from '../../models/instructor';

@Injectable({
  providedIn: 'root',
})
export class InstructorHttpService {
  constructor(private http: HttpClient) {}
  apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/Instructor';

  fetchInstructor(page: number, size: number): Observable<Instructor> {
    const params = new HttpParams().set('page', page).set('size', size);
    console.log(params.toString());
    return this.http.get<Instructor>(this.apiUrl, {
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
      this.apiUrl + '/searchByName',
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
      this.apiUrl,
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
      this.apiUrl + '/filterByCategory',
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
      this.apiUrl + '/filterByRole',
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
      this.apiUrl + '/filterByAge',
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
      this.apiUrl + '/filterByGender',
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
      this.apiUrl + '/sortByName',
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
      this.apiUrl + '/sortByPrice',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  uploadInstructor(instructor: Instructor): Observable<Instructor> {
    return this.http.post<Instructor>(this.apiUrl, instructor, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomInstructor(): Observable<Instructor> {
    return this.http.post<Instructor>(
      this.apiUrl + '/randomInstructor',
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  deleteAllInstructors(): Observable<Instructor> {
    return this.http.post<Instructor>(
      this.apiUrl + '/deleteAll',
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  deleteInstructor(id: string): Observable<ArrayBuffer> {
    return this.http.delete<ArrayBuffer>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  getInstructor(id: string): Observable<Instructor> {
    return this.http.get<Instructor>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  getInstructorByUserName(username: string): Observable<Instructor> {
    const params = new HttpParams().set('username', username);
    console.log(params.toString());
    return this.http.post<Instructor>(
      this.apiUrl + '/byUserName',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  deleteSelectedInstructors(
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

  updateInstructor(
    instructor: Instructor,
    key: string
  ): Observable<Instructor> {
    return this.http.post<Instructor>(
      this.apiUrl + `/updateInstructor/${key}`,
      instructor,
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  fetchAll(): Observable<Instructor> {
    return this.http.post<Instructor>(
      this.apiUrl + `/fetchAll`,
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }
}
