import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostulanteService } from '../../../services/postulante.service';

@Component({
    selector: 'app-sobre-mi-popup',
    imports: [ReactiveFormsModule],
    templateUrl: './sobre-mi-popup.component.html',
    styleUrl: './sobre-mi-popup.component.scss'
})
export class SobreMiPopupComponent implements OnInit {
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() confirmModifyEvent = new EventEmitter<number>();
  public userId: any = '';

  modifySobreMiForm = new FormGroup({
    descripcion: new FormControl(''),
  });

  constructor(private _postulanteService: PostulanteService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId')!;

    this._postulanteService
      .getPostulante(this.userId)
      .subscribe((postulante) => {
        if (postulante && postulante.Descripcion) {
          this.modifySobreMiForm.patchValue({
            descripcion: postulante.Descripcion,
          });
        }
      });
  }

  public closeModal() {
    this.closeModalEvent.emit();
  }

  public modificarSobreMi() {
    const updatedPostulante = {
      userId: this.userId,
      descripcion: this.modifySobreMiForm.value.descripcion,
    };

    this._postulanteService
      .modificarPostulanteInfo(updatedPostulante)
      .subscribe();
    this.confirmModifyEvent.emit();
  }
}
