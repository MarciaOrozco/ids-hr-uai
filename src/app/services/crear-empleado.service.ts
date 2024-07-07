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

  verEmpleados(): Observable<any> {
    return this.http.get(`${this.myAppUrl}empleados/listaEmpleados`);
  }

  verEmpleado(empleadoId: any): Observable<any> {
    return this.http.get(
      `${this.myAppUrl}empleados/get-empleado/` + empleadoId
    );
  }

  crearEmpleado(empleado: Empleado): Observable<any> {
    return this.http.post(`${this.myAppUrl}empleados/crear-empleado`, empleado);
  }

  eliminarEmpleado(empleadoId: any): Observable<any> {
    return this.http.delete(
      `${this.myAppUrl}empleados/eliminar-empleado/` + empleadoId
    );
  }

  modificarEmpleado(empleado: any): Observable<any> {
    return this.http.patch(
      `${this.myAppUrl}empleados/modificar-empleado/${empleado.id}`,
      empleado
    );
  }
}
