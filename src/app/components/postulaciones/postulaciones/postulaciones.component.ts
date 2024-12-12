import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleosService } from '../../../services/empleos.service';
import { CiudadService } from '../../../services/ciudad.service';
import { NgFor } from '@angular/common';
import { PostulacionesService } from '../../../services/postulaciones.service';
import { PostulanteService } from '../../../services/postulante.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-postulaciones',
  imports: [NgFor],
  templateUrl: './postulaciones.component.html',
  styleUrl: './postulaciones.component.scss',
})
export class PostulacionesComponent {
  public empleoId: string | null = '';
  public empleo: any;
  public empleoOrigen: any;
  public postulaciones: any[] = [];
  public postulantes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private _empleosService: EmpleosService,
    private _ciudadService: CiudadService,
    private _postulacionesService: PostulacionesService,
    private router: Router,
    private _postulanteService: PostulanteService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.empleoId = this.route.snapshot.paramMap.get('id');

    this._empleosService.getEmpleo(this.empleoId).subscribe((empleo) => {
      this.empleo = empleo;
      this._ciudadService
        .getCiudad(this.empleo.empleo.CiudadId)
        .subscribe((res) => {
          this.empleoOrigen = res;
        });
    });

    this._postulacionesService
      .getPostulaciones(this.empleoId)
      .subscribe((postulaciones) => {
        this.postulaciones = postulaciones;
        console.log(postulaciones);
      });

    this._postulanteService.getPostulantes().subscribe((postulantes) => {
      postulantes.forEach((postulante: any) => {
        this._postulanteService
          .getConcordancia(this.empleoId, postulante.id)
          .subscribe((concordancia: any) => {
            if (concordancia.porcentajeConcordancia > 0) {
              const postulanteData = {
                ...postulante,
                concordancia: concordancia.porcentajeConcordancia,
                habilidadesPostulante: concordancia.habilidadesPostulante,
              };

              this.postulantes.push(postulanteData);
            }
          });
      });
    });
  }

  public verPerfil(postulanteId: any, postulacion: any) {
    this.router.navigate(['/perfil-postulante', postulanteId, postulacion]);
  }

  public contactarPostulante(postulacion: any) {
    this._userService
      .getUserGrupo(postulacion.Postulante.Persona.UsuarioId)
      .subscribe((res: any) => {
        const email = res.Email;
      });

    const empleoId = postulacion.EmpleoId;

    // http://localhost:4200/detalle-empleo/12
  }
}
