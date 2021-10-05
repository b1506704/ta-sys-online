import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { File } from '../../models/file';
import { Container } from '../../models/container';

@Injectable({
  providedIn: 'root',
})
export class FileHttpService {
  constructor(private http: HttpClient) {}
  // apiContainerUrl =
  //   'https://ta-sys-online-server.azurewebsites.net/api/Container';
  // apiMediaUrl = 'https://ta-sys-online-server.azurewebsites.net/api/Media'; 
  apiMediaUrl = 'https://localhost:5001';
  apiContainerUrl = 'https://localhost:5001';

  fetchContainer(): Observable<Container> {
    return this.http.get<Container>(this.apiContainerUrl, {
      reportProgress: true,
      observe: 'body',
    });
  }

  uploadContainer(container: Container): Observable<Container> {
    return this.http.post<Container>(this.apiContainerUrl, container, {
      reportProgress: true,
      observe: 'body',
    });
  }

  updateContainer(
    oldContainerName: string,
    newContainerName: string
  ): Observable<any> {
    return this.http.put<any>(
      this.apiContainerUrl,
      { oldContainerName, newContainerName },
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  deleteContainer(container: Array<string>): Observable<any> {
    return this.http.post<any>(this.apiContainerUrl + '/delete', container, {
      reportProgress: true,
      observe: 'body',
    });
  }

  fetchFilesByContainer(container: string): Observable<any> {
    const params = new HttpParams().set('container', container);
    console.log(params.toString());
    return this.http.get<any>(this.apiMediaUrl, {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  filterFileByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ): Observable<File> {
    const params = new HttpParams()
      .set('Value', value)
      .set('Property', property)
      .set('PageNumber', page)
      .set('PageSize', size);
    console.log(params.toString());
    return this.http.get<File>(this.apiMediaUrl + '/filter', {
      params: params,
      reportProgress: true,
      observe: 'body',
    });
  }

  uploadFiles(selectedItems: Array<File>): Observable<any> {
    return this.http.post<any>(this.apiMediaUrl, selectedItems, {
      reportProgress: true,
      observe: 'body',
    });
  }

  downloadFile(id: string): Observable<any> {
    return this.http.post<any>(
      this.apiMediaUrl + '/download/file',
      { id },
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  downloadFiles(selectedItems: Array<string>): Observable<any> {
    return this.http.post(this.apiMediaUrl + '/download/files', selectedItems, {
      responseType: 'blob',
      reportProgress: true,
      observe: 'body',
    });
  }

  copyFiles(
    selectedItems: Array<File>,
    targetContainer: string
  ): Observable<any> {
    return this.http.put<any>(
      this.apiMediaUrl + '/copy',
      { id: selectedItems, targetContainer },
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  moveFiles(
    selectedItems: Array<File>,
    targetContainer: string
  ): Observable<any> {
    return this.http.put<any>(
      this.apiMediaUrl + '/move',
      { id: selectedItems, targetContainer },
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  deleteSelectedFiles(selectedItems: Array<string>): Observable<any> {
    return this.http.post<any>(this.apiMediaUrl + '/delete', selectedItems, {
      reportProgress: true,
      observe: 'body',
    });
  }

  updateFile(id: string, sourceID: string, title: string): Observable<any> {
    return this.http.put<any>(
      this.apiMediaUrl + '/update',
      { id, sourceID, title },
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }

  changeFileName(id: string, fileName: string): Observable<any> {
    return this.http.put<any>(
      this.apiMediaUrl + '/change-name',
      { id, fileName },
      {
        reportProgress: true,
        observe: 'body',
      }
    );
  }
}
