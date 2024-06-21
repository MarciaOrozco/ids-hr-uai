import { Component } from '@angular/core';
import { EmpleadosItemComponent } from '../empleados-item/empleados-item.component';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [EmpleadosItemComponent],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.scss',
})
export class EmpleadosComponent {}
