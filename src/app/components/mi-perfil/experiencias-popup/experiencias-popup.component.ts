import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostulanteService } from '../../../services/postulante.service';

@Component({
    selector: 'app-experiencias-popup',
    imports: [ReactiveFormsModule],
    templateUrl: './experiencias-popup.component.html',
    styleUrl: './experiencias-popup.component.scss'
})
export class ExperienciasPopupComponent implements OnInit {
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() confirmModifyEvent = new EventEmitter<number>();
  @Input() postulanteId!: number | undefined;

  modifyExperienciasForm = new FormGroup({
    puesto: new FormControl('', Validators.required),
    nombreEmpresa: new FormControl('', Validators.required),
    fechaInicio: new FormControl('', Validators.required),
    fechaFin: new FormControl(''),
    presente: new FormControl(''),
    descripcion: new FormControl('', Validators.required),
  });

  constructor(private _postulanteService: PostulanteService) {}

  ngOnInit(): void {
    this.modifyExperienciasForm
      .get('presente')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          this.modifyExperienciasForm.get('fechaFin')?.disable();
        } else {
          this.modifyExperienciasForm.get('fechaFin')?.enable();
        }
      });
  }

  public closeModal() {
    this.closeModalEvent.emit();
  }

  public modificarExperiencias() {
    const experiencia: any = {
      PostulanteId: this.postulanteId,
      Descripcion: this.modifyExperienciasForm.value.descripcion,
      FechaFin: this.modifyExperienciasForm.value.fechaFin,
      FechaInicio: this.modifyExperienciasForm.value.fechaInicio,
      NombreEmpresa: this.modifyExperienciasForm.value.nombreEmpresa,
      Presente: this.modifyExperienciasForm.value.presente ? true : false,
      Puesto: this.modifyExperienciasForm.value.puesto,
    };

    this._postulanteService.agregarExperiencias(experiencia).subscribe();
    this.confirmModifyEvent.emit();
  }
}
