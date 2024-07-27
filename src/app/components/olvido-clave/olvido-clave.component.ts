import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olvido-clave',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './olvido-clave.component.html',
  styleUrls: ['./olvido-clave.component.scss'],
})
export class OlvidoClaveComponent {
  recoveyPasswordForm = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email]),
  });

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private _userService: UserService, private router: Router) {}

  onSubmit() {
    if (this.recoveyPasswordForm.invalid) {
      this.errorMessage = 'Por favor, ingresa un correo electrónico válido.';
      return;
    }

    const email = this.recoveyPasswordForm.get('mail')?.value;

    this._userService.sendRecoveryEmail(email).subscribe({
      next: () => {
        this.successMessage =
          'Se ha enviado un código de recuperación a tu correo electrónico.';
        this.errorMessage = null;
      },
      error: (err: any) => {
        this.errorMessage =
          'Hubo un error al enviar el correo de recuperación. Por favor, inténtalo de nuevo.';
        this.successMessage = null;
      },
    });
  }

  public cambiarClave() {
    this.router.navigate(['/cambiar-clave-olvido']);
  }
}
