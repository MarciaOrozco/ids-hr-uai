import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-forgotten-pass',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './forgotten-pass.component.html',
  styleUrls: ['./forgotten-pass.component.scss'],
})
export class ForgottenPassComponent {
  recoveyPasswordForm = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email]),
  });

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private _userService: UserService) {}

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
}
