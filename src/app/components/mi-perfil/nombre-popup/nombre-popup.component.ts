import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostulanteService } from '../../../services/postulante.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-nombre-popup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nombre-popup.component.html',
  styleUrl: './nombre-popup.component.scss',
})
export class NombrePopupComponent implements OnInit {
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() confirmModifyEvent = new EventEmitter<number>();
  public userId: any = '';

  modifyNombreForm = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    titulo: new FormControl(''),
  });

  constructor(
    private _postulanteService: PostulanteService,
    private _userService: UserService
  ) {}

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

    this._userService.getPersonaInfo(this.userId).subscribe((persona: any) => {
      this.modifyNombreForm.patchValue({
        nombre: persona.Nombre,
        apellido: persona.Apellido,
      });
    });
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  modificarNombreTitulo() {
    const updatedPersona = {
      userId: this.userId,
      nombre: this.modifyNombreForm.value.nombre,
      apellido: this.modifyNombreForm.value.apellido,
    };

    const updatedPostulante = {
      userId: this.userId,
      titulo: this.modifyNombreForm.value.titulo,
    };

    this._userService.patchPersonaInfo(updatedPersona).subscribe();
    this._postulanteService.patchPostulanteInfo(updatedPostulante).subscribe();
    this.confirmModifyEvent.emit();
  }
}
