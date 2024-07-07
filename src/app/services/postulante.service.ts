import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostulanteService {
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  getPostulante(userId: any): Observable<any> {
    return this.http.get(`${this.myAppUrl}postulantes/getPostulante/` + userId);
  }

  getFormaciones(postulanteId: any): Observable<any> {
    return this.http.get(
      `${this.myAppUrl}postulantes/getFormaciones/` + postulanteId
    );
  }

  getExperiencias(postulanteId: any): Observable<any> {
    return this.http.get(
      `${this.myAppUrl}postulantes/getExperiencias/` + postulanteId
    );
  }

  getHabilidades(postulanteId: any): Observable<any> {
    return this.http.get(
      `${this.myAppUrl}postulantes/getHabilidades/` + postulanteId
    );
  }

  //Modificar
  public patchPostulanteInfo(postulante: any): Observable<Object> {
    return this.http.post(
      `${this.myAppUrl}postulantes/patchPostulante/`,
      postulante
    );
  }
}
