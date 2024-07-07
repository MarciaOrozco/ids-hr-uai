import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Empleado } from '../../../interfaces/empleado';
import { CrearEmpleadoService } from '../../../services/crear-empleado.service';

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

  constructor(
    private router: Router,
    private _empleadoService: CrearEmpleadoService
  ) {}

  crearEmpleado() {
    const clave = this.registerEmpleadoForm.get('clave')?.value;
    const confirmarClave = this.registerEmpleadoForm.get('repetirclave')?.value;

    if (this.registerEmpleadoForm.invalid) {
      return;
    }

    if (clave != confirmarClave) {
      return;
    }

    const empleado: any = {
      email: this.registerEmpleadoForm.get('email')?.value,
      clave: clave,
      nombre: this.registerEmpleadoForm.get('nombre')?.value,
      apellido: this.registerEmpleadoForm.get('apellido')?.value,
    };

    this._empleadoService.crearEmpleado(empleado).subscribe({
      next: (token: string) => {
        this.router.navigate(['/empleados']);
      },
      error: (err: any) => {
        console.error('Error en el login:', err);
        if (err.status === 400) {
          console.log('Error');
        }
      },
    });
  }
}
