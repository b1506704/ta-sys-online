import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../../models/room';

@Injectable({
  providedIn: 'root',
})
export class RoomHttpService {
  constructor(private http: HttpClient) {}
  apiUrl = 'https://ta-sys-online-server.azurewebsites.net/api/Room';

  fetchRoom(page: number, size: number): Observable<Room> {
    const params = new HttpParams().set('page', page).set('size', size);
    console.log(params.toString());
    return this.http.get<Room>(this.apiUrl, {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  searchRoomByName(
    value: string,
    page: number,
    size: number
  ): Observable<Room> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Room>(
      this.apiUrl + '/searchByName',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  filterRoomByPrice(
    criteria: string,
    value: number,
    page: number,
    size: number
  ): Observable<Room> {
    const params = new HttpParams()
      .set('criteria', criteria)
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Room>(
      this.apiUrl,
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  filterRoomByCategory(
    value: string,
    page: number,
    size: number
  ): Observable<Room> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Room>(
      this.apiUrl + '/filterByCategory',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  sortRoomByName(value: string, page: number, size: number): Observable<Room> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Room>(
      this.apiUrl + '/sortByName',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  sortRoomByPrice(value: string, page: number, size: number): Observable<Room> {
    const params = new HttpParams()
      .set('value', value)
      .set('page', page)
      .set('size', size);
    console.log(params.toString());
    return this.http.post<Room>(
      this.apiUrl + '/sortByPrice',
      {},
      {
        params: params,
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  uploadRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.apiUrl, room, {
      reportProgress: true,
      observe: 'body',
    });
  }

  generateRandomRoom(): Observable<Room> {
    return this.http.post<Room>(
      this.apiUrl + '/randomRoom',
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  deleteAllRooms(): Observable<Room> {
    return this.http.post<Room>(
      this.apiUrl + '/deleteAll',
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  deleteRoom(id: string): Observable<ArrayBuffer> {
    return this.http.delete<ArrayBuffer>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  getRoom(id: string): Observable<Room> {
    return this.http.get<Room>(this.apiUrl + `/${id}`, {
      reportProgress: true,
      observe: 'body',
    });
  }

  deleteSelectedRooms(selectedItems: Array<string>): Observable<Array<string>> {
    return this.http.post<Array<string>>(
      this.apiUrl + '/batch',
      selectedItems,
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  updateRoom(room: Room, key: string): Observable<Room> {
    return this.http.post<Room>(this.apiUrl + `/updateRoom/${key}`, room, {
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchAll(): Observable<Room> {
    return this.http.post<Room>(
      this.apiUrl + `/fetchAll`,
      {},
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }
}
