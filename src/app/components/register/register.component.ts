import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    clave: new FormControl('', [Validators.required, Validators.minLength(6)]),
    repetirclave: new FormControl('', Validators.required),
  });

  constructor(private _userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    const clave = this.registerForm.get('clave')?.value;
    const confirmarClave = this.registerForm.get('repetirclave')?.value;

    if (clave !== confirmarClave) {
      this.registerForm.get('repetirclave')?.setErrors({ mismatch: true });
      return;
    }

    const user: any = {
      email: this.registerForm.get('email')?.value,
      clave: clave,
      nombre: this.registerForm.get('nombre')?.value,
      apellido: this.registerForm.get('apellido')?.value,
    };

    this._userService.registrarse(user).subscribe({
      next: (token: string) => {
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('Error en el registro:', err);
        alert('Registro fallido. Por favor, revisa tus credenciales.');
      },
    });
  }
}
