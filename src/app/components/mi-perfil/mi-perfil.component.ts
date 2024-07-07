import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PostulanteService } from '../../services/postulante.service';
import { CiudadService } from '../../services/ciudad.service';
import {
  Experiencia,
  Formacion,
  Habilidad,
  Postulante,
} from '../../interfaces/postulante';
import { Ciudad } from '../../interfaces/ciudad';
import { forkJoin } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { DatePipe, NgFor } from '@angular/common';
import { UserService } from '../../services/user.service';
import { NombrePopupComponent } from './nombre-popup/nombre-popup.component';
import { DatosPopupComponent } from './datos-popup/datos-popup.component';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [NgFor, DatePipe, NombrePopupComponent, DatosPopupComponent],
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss'],
})
export class MiPerfilComponent implements OnInit {
  public fotoEditable: boolean = false;
  public userId: any = '';
  public postulanteResidencia: Ciudad = {} as Ciudad;
  public postulante: Postulante = {} as Postulante;
  public experiencias: Experiencia[] = [];
  public habilidades: Habilidad[] = [];
  public cursos: Formacion[] = [];
  public universidades: Formacion[] = [];
  public secundaria: Formacion[] = [];
  public email: string = '';
  public nombre: string = '';
  public apellido: string = '';

  // Modales
  public isModalModificarOpen = false;
  public isModalDatosOpen = false;

  @ViewChild('fileInput') fileInput!: ElementRef;

  user = {
    img: '',
  };

  constructor(
    private _postulanteService: PostulanteService,
    private _ciudadService: CiudadService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId')!;
    this.loadData();
  }

  public loadData() {
    this._userService.getUserGrupo(this.userId).subscribe((res: any) => {
      this.email = res.Email;
    });

    this._userService.getPersonaInfo(this.userId).subscribe((res: any) => {
      this.nombre = res.Nombre;
      this.apellido = res.Apellido;
    });

    this._postulanteService
      .getPostulante(this.userId)
      .pipe(
        tap((postulante) => (this.postulante = postulante)),
        switchMap((postulante) =>
          forkJoin({
            ciudad: this._ciudadService.getCiudad(postulante.CiudadId),
            experiencias: this._postulanteService.getExperiencias(
              postulante.id
            ),
            formaciones: this._postulanteService.getFormaciones(postulante.id),
            habilidades: this._postulanteService.getHabilidades(postulante.id),
          })
        ),
        tap((results) => {
          this.postulanteResidencia = results.ciudad;
          this.experiencias = results.experiencias;
          this.habilidades = results.habilidades;
          this.formacionesHelper(results.formaciones);
        })
      )
      .subscribe({
        error: (err) => console.error('Error fetching data', err),
      });
  }

  formacionesHelper(formaciones: any) {
    formaciones.forEach((formacion: Formacion) => {
      switch (formacion.TipoFormacion.Tipo) {
        case 'Cursos':
          this.cursos.push(formacion);
          break;
        case 'Universidad':
          this.universidades.push(formacion);
          break;
        case 'Secundaria':
          this.secundaria.push(formacion);
          break;
        default:
          break;
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.img = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  abrirModalModificarNombre() {
    this.isModalModificarOpen = true;
  }

  abrirModalModificarDatos() {
    this.isModalDatosOpen = true;
  }

  cerrarModal() {
    this.isModalModificarOpen = false;
    this.isModalDatosOpen = false;
  }

  modificarNombreTitulo() {
    this.cerrarModal();
    this.loadData();
  }
}
