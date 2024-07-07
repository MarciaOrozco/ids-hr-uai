import { Component } from '@angular/core';
import { EmpleadosItemComponent } from '../empleados-item/empleados-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [EmpleadosItemComponent],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.scss',
})
export class EmpleadosComponent {
  constructor(private router: Router) {}

  crearEmpleado() {
    this.router.navigate(['/crear-empleado']);
  }
}
