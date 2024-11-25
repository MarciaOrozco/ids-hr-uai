import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostulanteService } from '../../../services/postulante.service';

@Component({
    selector: 'app-estudios-popup',
    imports: [ReactiveFormsModule],
    templateUrl: './estudios-popup.component.html',
    styleUrl: './estudios-popup.component.scss'
})
export class EstudiosPopupComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() confirmModifyEvent = new EventEmitter<number>();
  @Input() postulanteId!: number | undefined;

  agregarFormacionForm = new FormGroup({
    tipoEstudio: new FormControl('', Validators.required),
    fechaInicio: new FormControl('', Validators.required),
    fechaFin: new FormControl(''),
    descripcion: new FormControl('', Validators.required),
  });

  constructor(private _postulanteService: PostulanteService) {}

  ngOnInit(): void {}

  public closeModal() {
    this.closeModalEvent.emit();
  }

  public estudioHelper(tipoEstudio: any): number {
    let res: number = 0;
    if (tipoEstudio === 'curso') {
      res = 1;
    } else if (tipoEstudio === 'universitarios') {
      res = 2;
    } else if (tipoEstudio === 'maestria') {
      res = 3;
    } else {
      res = 4;
    }
    return res;
  }

  public agregarFormacion() {
    const formacion: any = {
      PostulanteId: this.postulanteId,
      Descripcion: this.agregarFormacionForm.value.descripcion,
      TipoFormacionId: this.estudioHelper(
        this.agregarFormacionForm.value.tipoEstudio
      ),
      FechaFin: this.agregarFormacionForm.value.fechaFin,
      FechaInicio: this.agregarFormacionForm.value.fechaInicio,
    };

    this._postulanteService.agregarFormacion(formacion).subscribe();
    this.confirmModifyEvent.emit();
  }
}
