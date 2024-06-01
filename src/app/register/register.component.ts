import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm = new FormGroup({
    mail: new FormControl(''),
    name: new FormControl(''),
    lastname: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl(''),
  });


}
