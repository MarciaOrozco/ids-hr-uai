import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-cambiar-clave',
    imports: [ReactiveFormsModule],
    templateUrl: './cambiar-clave.component.html',
    styleUrls: ['./cambiar-clave.component.scss']
})
export class CambiarClaveComponent {
  recoveyPasswordForm = new FormGroup({
    claveAnterior: new FormControl('', [Validators.required]),
    nuevaClave: new FormControl('', [Validators.required]),
    repetirClave: new FormControl('', [Validators.required]),
  });

  formErrors: any = {};
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private userService: UserService) {}

  onSubmit() {
    this.formErrors = {};
    this.successMessage = null;
    this.errorMessage = null;

    if (this.recoveyPasswordForm.valid) {
      const { claveAnterior, nuevaClave, repetirClave } =
        this.recoveyPasswordForm.value;

      if (nuevaClave !== repetirClave) {
        this.formErrors.repetirClave = 'Las nuevas contraseñas no coinciden';
        return;
      }

      if (claveAnterior && nuevaClave)
        this.userService.cambiarClave(claveAnterior, nuevaClave).subscribe(
          (response) => {
            this.successMessage = 'Contraseña cambiada exitosamente';
          },
          (error) => {
            this.errorMessage = 'Error al cambiar la contraseña';
          }
        );
    } else {
      this.validateForm();
    }
  }

  validateForm() {
    if (this.recoveyPasswordForm.get('claveAnterior')?.hasError('required')) {
      this.formErrors.claveAnterior = 'La clave anterior es requerida';
    }

    if (this.recoveyPasswordForm.get('nuevaClave')?.hasError('required')) {
      this.formErrors.nuevaClave = 'La nueva clave es requerida';
    }

    if (this.recoveyPasswordForm.get('repetirClave')?.hasError('required')) {
      this.formErrors.repetirClave = 'Repetir la nueva clave es requerido';
    }
  }
}
