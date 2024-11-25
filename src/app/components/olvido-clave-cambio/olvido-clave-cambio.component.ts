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
    selector: 'app-olvido-clave-cambio',
    imports: [NgIf, ReactiveFormsModule],
    templateUrl: './olvido-clave-cambio.component.html',
    styleUrl: './olvido-clave-cambio.component.scss'
})
export class OlvidoClaveCambioComponent {
  cambiarClaveForm = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email]),
    codigo: new FormControl('', [Validators.required]),
    nuevaClave: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private _userService: UserService, private router: Router) {}

  onSubmit() {
    if (this.cambiarClaveForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    const { mail, codigo, nuevaClave } = this.cambiarClaveForm.value;

    this._userService.validarCodigo(mail, codigo, nuevaClave).subscribe({
      next: () => {
        this.successMessage = 'Contraseña actualizada exitosamente.';
        this.errorMessage = null;
        setTimeout(() => {}, 50000);
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.errorMessage =
          'Error al actualizar la contraseña. Verifica el código y vuelve a intentarlo.';
        this.successMessage = null;
      },
    });
  }
}
