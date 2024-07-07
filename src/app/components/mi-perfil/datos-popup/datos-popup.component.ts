import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostulanteService } from '../../../services/postulante.service';

@Component({
  selector: 'app-datos-popup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './datos-popup.component.html',
  styleUrl: './datos-popup.component.scss',
})
export class DatosPopupComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  public userId: any = '';

  modifyNombreForm = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    titulo: new FormControl(''),
  });

  constructor(private _postulanteService: PostulanteService) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId')!;

    this._postulanteService
      .getPostulante(this.userId)
      .subscribe((postulante) => {
        if (postulante && postulante.Titulo) {
          this.modifyNombreForm.patchValue({
            titulo: postulante.Titulo,
          });
        }
      });
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  modificarDatos() {
    const updatedPostulante = {
      userId: this.userId,
      titulo: this.modifyNombreForm.value.titulo,
    };

    this._postulanteService.patchPostulanteInfo(updatedPostulante).subscribe();
    this.closeModalEvent.emit();
  }
}
