import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmpleosService {
  private myAppUrl: string = environment.endpoint;

  constructor(private http: HttpClient) {}

  public getEmpleos(): Observable<any> {
    return this.http.get(`${this.myAppUrl}empleos/get-empleos`);
  }

  public getEmpleo(empleoId: any): Observable<any> {
    return this.http.get(`${this.myAppUrl}empleos/get-empleo/` + empleoId);
  }

  public crearEmpleo(empleo: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}empleos/crear-empleo`, empleo);
  }

  public agregarHabilidad(empleo: any): Observable<any> {
    return this.http.post(
      `${this.myAppUrl}empleos/crear-empleo-habilidad`,
      empleo
    );
  }

  public eliminarHabilidad(
    empleoId: any,
    habilidadNombre: any
  ): Observable<any> {
    return this.http.delete(
      `${this.myAppUrl}empleos/eliminar-empleo-habilidad?EmpleoId=${empleoId}&habilidad=${habilidadNombre}`
    );
  }

  public eliminarEmpleo(empleo: any): Observable<any> {
    return this.http.delete(
      `${this.myAppUrl}empleos/eliminar-empleo/${empleo.id}/${empleo.userId}`
    );
  }

  public modificarEmpleo(empleo: any): Observable<any> {
    return this.http.patch(
      `${this.myAppUrl}empleos/modificar-empleo/${empleo.id}`,
      empleo
    );
  }

  getHabilidadesEmpleo(empleoId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.myAppUrl}empleos/get-habilidades-empleo/${empleoId}`
    );
  }
}
