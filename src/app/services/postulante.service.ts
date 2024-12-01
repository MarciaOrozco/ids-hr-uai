import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Experiencia, Postulante } from '../interfaces/postulante';

@Injectable({
  providedIn: 'root',
})
export class PostulanteService {
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
  }

  getPostulante(userId: number): Observable<any> {
    return this.http.get(`${this.myAppUrl}postulantes/getPostulante/` + userId);
  }

  getFormaciones(postulanteId: number): Observable<any> {
    return this.http.get(
      `${this.myAppUrl}postulantes/getFormaciones/` + postulanteId
    );
  }

  getExperiencias(postulanteId: number): Observable<any> {
    return this.http.get(
      `${this.myAppUrl}postulantes/getExperiencias/` + postulanteId
    );
  }

  getHabilidades(postulanteId: number): Observable<any> {
    return this.http.get(
      `${this.myAppUrl}postulantes/getHabilidades/` + postulanteId
    );
  }

  getTipoHabilidades(): Observable<any> {
    return this.http.get(`${this.myAppUrl}postulantes/getTipoHabilidades/`);
  }

  public modificarPostulanteInfo(postulante: any): Observable<Object> {
    return this.http.post(
      `${this.myAppUrl}postulantes/patchPostulante/`,
      postulante
    );
  }

  public agregarExperiencias(experiencia: Experiencia): Observable<any> {
    return this.http.post(
      `${this.myAppUrl}postulantes/agregarExperiencias/` +
        experiencia.PostulanteId,
      experiencia
    );
  }

  public agregarHabilidad(experiencia: Experiencia): Observable<any> {
    return this.http.post(
      `${this.myAppUrl}postulantes/agregarHabilidad/` +
        experiencia.PostulanteId,
      experiencia
    );
  }

  public agregarFormacion(experiencia: Experiencia): Observable<any> {
    return this.http.post(
      `${this.myAppUrl}postulantes/agregarFormacion/` +
        experiencia.PostulanteId,
      experiencia
    );
  }

  public deleteExperiencia(experienciaId: number): Observable<any> {
    return this.http.delete(
      `${this.myAppUrl}postulantes/deleteExperiencia/` + experienciaId
    );
  }

  public deleteFormacion(formacionId: number): Observable<any> {
    return this.http.delete(
      `${this.myAppUrl}postulantes/deleteFormacion/` + formacionId
    );
  }

  public deleteHabilidad(habilidadId: number): Observable<any> {
    return this.http.delete(
      `${this.myAppUrl}postulantes/deleteHabilidad/` + habilidadId
    );
  }

  public eliminarPostulante(userId: any): Observable<any> {
    return this.http.delete(
      `${this.myAppUrl}postulantes/eliminar-usuario/` + userId
    );
  }

  public aplicarEmpleo(postulacion: Experiencia): Observable<any> {
    return this.http.post(
      `${this.myAppUrl}postulantes/postularse`,
      postulacion
    );
  }

  public getPostulacion(empleoId: any, postulanteId: any): Observable<any> {
    return this.http.get(
      `${this.myAppUrl}postulantes/get-postulacion?empleoId=${empleoId}&postulanteId=${postulanteId}`
    );
  }

  public getConcordancia(empleoId: any, postulanteId: any): Observable<any> {
    return this.http.get(
      `${this.myAppUrl}postulantes/get-concordancia?empleoId=${empleoId}&postulanteId=${postulanteId}`
    );
  }
}
