import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instructor } from '../../models/instructor';

@Injectable({
  providedIn: 'root',
})
export class InstructorHttpService {
  constructor(private http: HttpClient) {}
 
}
