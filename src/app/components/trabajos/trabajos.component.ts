import { Component } from '@angular/core';
import { TrabajoItemComponent } from '../trabajo-item/trabajo-item.component';

@Component({
  selector: 'app-trabajos',
  standalone: true,
  imports: [TrabajoItemComponent],
  templateUrl: './trabajos.component.html',
  styleUrl: './trabajos.component.scss',
})
export class TrabajosComponent {}
