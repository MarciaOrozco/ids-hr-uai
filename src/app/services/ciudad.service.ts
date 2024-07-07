import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CiudadService {
  private myAppUrl: string = environment.endpoint;

  constructor(private http: HttpClient) {}

  getCiudad(ciudadId: any): Observable<any> {
    return this.http.get(`${this.myAppUrl}residencia/getCiudad/` + ciudadId);
  }
}
