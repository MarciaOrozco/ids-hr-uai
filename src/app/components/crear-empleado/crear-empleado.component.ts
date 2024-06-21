import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-empleado',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-empleado.component.html',
  styleUrl: './crear-empleado.component.scss',
})
export class CrearEmpleadoComponent {
  registerEmpleadoForm = new FormGroup({
    email: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    clave: new FormControl(''),
    repetirclave: new FormControl(''),
  });

  constructor(private router: Router) {}
}
