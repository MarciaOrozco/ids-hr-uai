import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../interfaces/usuarios';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, NgIf],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public errorLogin: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    clave: new FormControl('', [Validators.required]),
  });

  constructor(private _userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  public login() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.get('email')?.value;
    const clave = this.loginForm.get('clave')?.value;

    const user: Usuario = {
      email: email!,
      clave: clave!,
    };

    this._userService.login(user).subscribe({
      next: (token: string) => {
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        if (err.status === 400 && err.error.msg === 'Password Incorrecta') {
          this.loginForm.get('clave')?.setErrors({ incorrect: true });
        } else {
          this.errorLogin = true;
        }
      },
    });
  }
}
