import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cargar-curriculum',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cargar-curriculum.component.html',
  styleUrl: './cargar-curriculum.component.scss',
})
export class CargarCurriculumComponent {
  registerForm = new FormGroup({
    mail: new FormControl(''),
    name: new FormControl(''),
    lastname: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl(''),
  });
}
