import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from '../../models/bill';

@Injectable({
  providedIn: 'root',
})
export class BillHttpService {
  constructor(private http: HttpClient) {}
  apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/Bill';

  fetchBill(page: number, size: number): Observable<Bill> {
    const params = new HttpParams().set('page', page).set('size', size);
    console.log(params.toString());
    return this.http.get<Bill>(this.apiUrl, {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchBillByName(
    value: string,
    page: number,
    size: number
  ): Observable<Bill> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Bill>(
      this.apiUrl + '/searchByName',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  filterBillByPrice(
    criteria: string,
    value: number,
    page: number,
    size: number
  ): Observable<Bill> {
    const params = new HttpParams()
      .set('criteria', criteria)
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Bill>(
      this.apiUrl,
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  filterBillByCategory(
    value: string,
    page: number,
    size: number
  ): Observable<Bill> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Bill>(
      this.apiUrl + '/filterByCategory',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  sortBillByName(
    value: string,
    page: number,
    size: number
  ): Observable<Bill> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Bill>(
      this.apiUrl + '/sortByName',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  sortBillByPrice(
    value: string,
    page: number,
    size: number
  ): Observable<Bill> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Bill>(
      this.apiUrl + '/sortByPrice',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  uploadBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.apiUrl, bill, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomBill(): Observable<Bill> {
    return this.http.post<Bill>(
      this.apiUrl + '/randomBill',
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  deleteAllBills(): Observable<Bill> {
    return this.http.post<Bill>(this.apiUrl + '/deleteAll',{}, {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteBill(id: string): Observable<ArrayBuffer> {
    return this.http.delete<ArrayBuffer>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  getBill(id: string): Observable<Bill> {
    return this.http.get<Bill>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteSelectedBills(
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

  updateBill(bill: Bill, key: string): Observable<Bill> {
    return this.http.post<Bill>(
      this.apiUrl + `/updateBill/${key}`,
      bill,
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  fetchAll(): Observable<Bill> {
    return this.http.post<Bill>(
      this.apiUrl + `/fetchAll`,
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }
}
