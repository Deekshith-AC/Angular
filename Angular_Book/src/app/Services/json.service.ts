import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  storeData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}

