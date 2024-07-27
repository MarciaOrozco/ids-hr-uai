import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ciudades, Pais, Provincia } from '../interfaces/ciudad';

@Injectable({
  providedIn: 'root',
})
export class CiudadService {
  private myAppUrl: string = environment.endpoint;

  constructor(private http: HttpClient) {}

  public getPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.myAppUrl}residencia/getPaises`);
  }

  public getProvincias(paisId: number): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(
      `${this.myAppUrl}residencia/getProvincias/` + paisId
    );
  }

  public getCiudades(provinciaId: number): Observable<Ciudades[]> {
    return this.http.get<Ciudades[]>(
      `${this.myAppUrl}residencia/getCiudades/` + provinciaId
    );
  }

  public getCiudad(ciudadId: any): Observable<any> {
    return this.http.get(`${this.myAppUrl}residencia/getCiudad/` + ciudadId);
  }
}
