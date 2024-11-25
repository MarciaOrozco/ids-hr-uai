import { DatePipe, NgFor } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ciudad } from '../../../interfaces/ciudad';
import {
  Experiencia,
  Formacion,
  Habilidad,
  Postulante,
} from '../../../interfaces/postulante';
import { PostulanteService } from '../../../services/postulante.service';
import { CiudadService } from '../../../services/ciudad.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, switchMap, tap } from 'rxjs';
import { PostulacionesService } from '../../../services/postulaciones.service';

@Component({
    selector: 'app-perfil-postulante',
    imports: [NgFor, DatePipe],
    templateUrl: './perfil-postulante.component.html',
    styleUrl: './perfil-postulante.component.scss'
})
export class PerfilPostulanteComponent {
  public fotoEditable: boolean = false;
  public userId: any = '';
  public postulacionId: any = '';
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

  constructor(
    private _postulanteService: PostulanteService,
    private _postulacionesService: PostulacionesService,
    private _ciudadService: CiudadService,
    private _userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('postulanteId');
    this.postulacionId = this.route.snapshot.paramMap.get('postulacion');

    this._userService.getUserGrupo(this.userId).subscribe((res: any) => {
      this.email = res.Email;
    });
    this.loadData();
  }

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

  public aprobarPostulante() {
    const postulacion = {
      id: this.postulacionId,
      EstadoId: 2,
    };
    this._postulacionesService.aprobarPostulante(postulacion).subscribe();
  }

  public rechazarPostulante() {
    const postulacion = {
      id: this.postulacionId,
      EstadoId: 3,
    };
    this._postulacionesService.rechazarPostulante(postulacion).subscribe();
  }
}
