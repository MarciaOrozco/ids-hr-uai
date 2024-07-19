import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../interfaces/empleado';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CrearEmpleadoService {
  private myAppUrl: string = environment.endpoint;

  constructor(private http: HttpClient) {}

  public verEmpleados(): Observable<any> {
    return this.http.get(`${this.myAppUrl}empleados/listaEmpleados`);
  }

  public verEmpleado(empleadoId: any): Observable<any> {
    return this.http.get(
      `${this.myAppUrl}empleados/get-empleado/` + empleadoId
    );
  }

  public crearEmpleado(empleado: Empleado): Observable<any> {
    return this.http.post(`${this.myAppUrl}empleados/crear-empleado`, empleado);
  }

  public eliminarEmpleado(empleadoId: any): Observable<any> {
    return this.http.delete(
      `${this.myAppUrl}empleados/eliminar-empleado/` + empleadoId
    );
  }

  public modificarEmpleado(empleado: any): Observable<any> {
    return this.http.patch(
      `${this.myAppUrl}empleados/modificar-empleado/${empleado.id}`,
      empleado
    );
  }
}
