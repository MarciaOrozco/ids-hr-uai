import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostulacionesService {
  private myAppUrl: string = environment.endpoint;

  constructor(private http: HttpClient) {}

  public getPostulaciones(empleoId: any): Observable<any> {
    return this.http.get(
      `${this.myAppUrl}postulaciones/get-postulaciones/` + empleoId
    );
  }

  public getPostulacionDePostulante(postulanteId: any): Observable<any> {
    return this.http.get(
      `${this.myAppUrl}postulaciones/get-postulacion-postulante/` + postulanteId
    );
  }

  public aprobarPostulante(postulacion: any): Observable<any> {
    return this.http.patch(
      `${this.myAppUrl}postulaciones/aprobar-postulado/` + postulacion.id,
      postulacion
    );
  }

  public rechazarPostulante(postulacion: any): Observable<any> {
    return this.http.patch(
      `${this.myAppUrl}postulaciones/rechazar-postulado/` + postulacion.id,
      postulacion
    );
  }

  public eliminarPostulacion(postulacionId: any): Observable<any> {
    return this.http.delete(
      `${this.myAppUrl}postulaciones/eliminar-postulacion/` + postulacionId
    );
  }
}
