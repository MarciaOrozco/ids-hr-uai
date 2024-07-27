import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CrearEmpleadoService } from '../../../services/crear-empleado.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-crear-empleado',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './crear-empleado.component.html',
  styleUrl: './crear-empleado.component.scss',
})
export class CrearEmpleadoComponent {
  registerEmpleadoForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    clave: new FormControl('', [Validators.required, Validators.minLength(6)]),
    repetirclave: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private _empleadoService: CrearEmpleadoService
  ) {
    this.registerEmpleadoForm.setValidators(this.passwordMatchValidator);
  }

  crearEmpleado() {
    const clave = this.registerEmpleadoForm.get('clave')?.value;
    const confirmarClave = this.registerEmpleadoForm.get('repetirclave')?.value;

    if (this.registerEmpleadoForm.invalid) {
      return;
    }

    if (clave !== confirmarClave) {
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
  public passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('clave')?.value;
    const confirmPassword = control.get('repetirclave')?.value;
    if (password !== confirmPassword) {
      return { claveMismatch: true };
    }
    return null;
  }

  public cancelar() {
    this.router.navigate(['/empleados']);
  }
}
