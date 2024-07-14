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
import { SobreMiPopupComponent } from './sobre-mi-popup/sobre-mi-popup.component';
import { ExperienciasPopupComponent } from './experiencias-popup/experiencias-popup.component';
import { HabilidadesPopupComponent } from './habilidades-popup/habilidades-popup.component';
import { EstudiosPopupComponent } from './estudios-popup/estudios-popup.component';
import { Router } from '@angular/router';
import { EliminarUsuarioPopupComponent } from './eliminar-usuario-popup/eliminar-usuario-popup.component';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [
    NgFor,
    DatePipe,
    NombrePopupComponent,
    DatosPopupComponent,
    SobreMiPopupComponent,
    ExperienciasPopupComponent,
    HabilidadesPopupComponent,
    EstudiosPopupComponent,
    EliminarUsuarioPopupComponent,
  ],
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
  public maestria: Formacion[] = [];
  public otros: Formacion[] = [];
  public email: string = '';
  public nombre: string = '';
  public apellido: string = '';
  public user = {
    img: '',
  };
  @ViewChild('fileInput') fileInput!: ElementRef;

  // Modales
  public isModalModificarOpen = false;
  public isModalDatosOpen = false;
  public isModificarDescripcionOpen = false;
  public isModificarExperiencianOpen = false;
  public isModificarEstudiosOpen = false;
  public isModificarHabilidadesOpen = false;
  public isEliminarUsuarioOpen = false;

  constructor(
    private _postulanteService: PostulanteService,
    private _ciudadService: CiudadService,
    private _userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId')!;
    this._userService.getUserGrupo(this.userId).subscribe((res: any) => {
      this.email = res.Email;
    });
    this.loadData();
  }

  // GET INFO

  public loadData() {
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

  public formacionesHelper(formaciones: Formacion[]) {
    formaciones.forEach((formacion: Formacion) => {
      switch (formacion.TipoFormacion.Tipo) {
        case 'Curso':
          if (!this.formacionExists(this.cursos, formacion)) {
            this.cursos.push(formacion);
          }
          break;
        case 'Universidad':
          if (!this.formacionExists(this.universidades, formacion)) {
            this.universidades.push(formacion);
          }
          break;
        case 'Secundaria':
          if (!this.formacionExists(this.secundaria, formacion)) {
            this.secundaria.push(formacion);
          }
          break;
        case 'Maestria':
          if (!this.formacionExists(this.maestria, formacion)) {
            this.maestria.push(formacion);
          }
          break;
        case 'Otro':
          if (!this.formacionExists(this.otros, formacion)) {
            this.otros.push(formacion);
          }
          break;
        default:
          break;
      }
    });
  }

  public formacionExists(array: Formacion[], formacion: Formacion): boolean {
    return array.some((f) => f.id === formacion.id);
  }

  public onFileSelected(event: Event) {
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

  public triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  // MODALES

  public abrirModalModificarNombre() {
    this.isModalModificarOpen = true;
  }

  public abrirModalModificarDatos() {
    this.isModalDatosOpen = true;
  }

  public abrirModificarDescripcion() {
    this.isModificarDescripcionOpen = true;
  }
  public abrirModificarExperiencia() {
    this.isModificarExperiencianOpen = true;
  }

  public abrirModificarFormacion() {
    this.isModificarEstudiosOpen = true;
  }

  public abrirModificarHabilidades() {
    this.isModificarHabilidadesOpen = true;
  }

  public cerrarModal() {
    this.isModalModificarOpen = false;
    this.isModalDatosOpen = false;
    this.isModificarDescripcionOpen = false;
    this.isModificarExperiencianOpen = false;
    this.isModificarEstudiosOpen = false;
    this.isModificarHabilidadesOpen = false;
    this.isEliminarUsuarioOpen = false;
    this.loadData();
  }

  public modificarNombreTitulo() {
    this.cerrarModal();
    this.loadData();
  }

  // ELIMINAR

  public cambiarClave() {
    this.router.navigate(['/cambiar-clave']);
  }

  public eliminarCuenta() {
    this.isEliminarUsuarioOpen = true;
  }

  public deleteExperiencia(experiencia: any) {
    this._postulanteService.deleteExperiencia(experiencia.id).subscribe();
  }

  public deleteFormacion(formacion: any) {
    this._postulanteService.deleteFormacion(formacion.id).subscribe();
  }

  public deleteHabilidad(habilidad: any) {
    this._postulanteService.deleteHabilidad(habilidad.id).subscribe();
  }
}
