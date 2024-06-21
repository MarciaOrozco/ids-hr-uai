import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Usuarios } from '../../interfaces/usuarios';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    clave: new FormControl('', [Validators.required]),
  });

  constructor(private _userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.get('email')?.value;
    const clave = this.loginForm.get('clave')?.value;

    const user: Usuarios = {
      email: email!,
      clave: clave!,
    };

    this._userService.login(user).subscribe({
      next: (token: string) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        console.error('Error en el login:', err);
        if (err.status === 400 && err.error.msg === 'Password Incorrecta') {
          this.loginForm.get('clave')?.setErrors({ incorrect: true });
        } else {
          alert('Login fallido. Por favor, revisa tus credenciales.');
        }
      },
    });
  }
}
