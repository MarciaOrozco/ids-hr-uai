import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    clave: new FormControl(''),
    repetirclave: new FormControl(''),
  });

  constructor(private _userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    const clave = this.registerForm.get('clave')?.value;
    const confirmarClave = this.registerForm.get('repetirclave')?.value;

    if (this.registerForm.invalid) {
      return;
    }

    if (clave != confirmarClave) {
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
        console.error('Error en el login:', err);
        if (err.status === 400 && err.error.msg === 'Password Incorrecta') {
          this.registerForm.get('clave')?.setErrors({ incorrect: true });
        } else {
          alert('Login fallido. Por favor, revisa tus credenciales.');
        }
      },
    });
  }
}
