import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgotten-pass',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgotten-pass.component.html',
  styleUrl: './forgotten-pass.component.scss',
})
export class ForgottenPassComponent {
  recoveyPasswordForm = new FormGroup({
    mail: new FormControl(''),
  });
}
