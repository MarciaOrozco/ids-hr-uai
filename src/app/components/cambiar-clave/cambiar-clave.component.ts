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
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cambiar-clave.component.html',
  styleUrl: './cambiar-clave.component.scss',
})
export class CambiarClaveComponent {
  recoveyPasswordForm = new FormGroup({
    claveAnterior: new FormControl('', [Validators.required]),
    nuevaClave: new FormControl('', [Validators.required]),
    repetirClave: new FormControl('', [Validators.required]),
  });

  onSubmit() {}
}
