import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from '../../models/bill';

@Injectable({
  providedIn: 'root',
})
export class BillHttpService {
  constructor(private http: HttpClient) {}
  // apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/Bill';
  apiUrl = 'https://localhost:5001/api/Bill';

  uploadBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.apiUrl, bill, {
      reportProgress: true,
      observe: 'body',
    });
  }
}
