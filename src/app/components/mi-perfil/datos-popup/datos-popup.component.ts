import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostulanteService } from '../../../services/postulante.service';
import { CiudadService } from '../../../services/ciudad.service';
import { Ciudades, Pais, Provincia } from '../../../interfaces/ciudad';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-datos-popup',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './datos-popup.component.html',
  styleUrl: './datos-popup.component.scss',
})
export class DatosPopupComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  public userId: any = '';
  public paises: Pais[] = [];
  public provincias: Provincia[] = [];
  public ciudades: Ciudades[] = [];
  public paisSeleccionado: boolean = false;
  public provinciaSeleccionada: boolean = false;
  public ciudadSeleccionada: boolean = false;

  modifyDatosForm = new FormGroup({
    numero: new FormControl(''),
    fechaNacimiento: new FormControl(''),
    pais: new FormControl(''),
    provincia: new FormControl(''),
    ciudad: new FormControl(''),
    residencia: new FormControl(''),
  });

  constructor(
    private _postulanteService: PostulanteService,
    private _ciudadService: CiudadService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId')!;

    this._postulanteService
      .getPostulante(this.userId)
      .subscribe((postulante) => {
        if (postulante) {
          this.modifyDatosForm.patchValue({
            numero: postulante.Telefono,
            fechaNacimiento: this.formatDateToYYYYMMDD(
              postulante.FechaNacimiento
            ),
          });

          if (postulante.CiudadId) {
            this.ciudadSeleccionada = true;
            this._ciudadService
              .getCiudad(postulante.CiudadId)
              .subscribe((residencia) => {
                this.modifyDatosForm.patchValue({
                  residencia:
                    residencia.ciudad +
                    ', ' +
                    residencia.provincia +
                    ', ' +
                    residencia.pais,
                });
              });
          }
        }
      });

    this._ciudadService.getPaises().subscribe((paises) => {
      this.paises = paises;
    });
  }

  public onPaisChange(event: any) {
    const paisId = event.target.value;
    if (paisId) {
      this._ciudadService.getProvincias(paisId).subscribe((provincias) => {
        this.provincias = provincias;
        this.ciudades = [];
        this.paisSeleccionado = true;
        this.provinciaSeleccionada = false;
      });
    } else {
      this.provincias = [];
      this.ciudades = [];
      this.paisSeleccionado = false;
      this.provinciaSeleccionada = false;
    }
  }

  public onProvinciaChange(event: any) {
    const provinciaId = event.target.value;
    if (provinciaId) {
      this._ciudadService.getCiudades(provinciaId).subscribe((ciudades) => {
        this.ciudades = ciudades;
        this.provinciaSeleccionada = true;
      });
    } else {
      this.ciudades = [];
      this.provinciaSeleccionada = false;
    }
  }

  public closeModal() {
    this.closeModalEvent.emit();
  }

  public modificarDatos() {
    const updatedPostulante: any = {
      userId: this.userId,
      telefono: this.modifyDatosForm.value.numero,
      fechaNacimiento: this.modifyDatosForm.value.fechaNacimiento,
      ciudadId: this.modifyDatosForm.value.ciudad,
    };

    this._postulanteService
      .modificarPostulanteInfo(updatedPostulante)
      .subscribe();
    this.closeModalEvent.emit();
  }

  public formatDateToYYYYMMDD(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }
}
