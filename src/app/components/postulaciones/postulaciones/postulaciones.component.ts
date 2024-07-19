import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleosService } from '../../../services/empleos.service';
import { CiudadService } from '../../../services/ciudad.service';
import { NgFor } from '@angular/common';
import { PostulacionesService } from '../../../services/postulaciones.service';

@Component({
  selector: 'app-postulaciones',
  standalone: true,
  imports: [NgFor],
  templateUrl: './postulaciones.component.html',
  styleUrl: './postulaciones.component.scss',
})
export class PostulacionesComponent {
  public empleoId: string | null = '';
  public empleo: any;
  public empleoOrigen: any;

  public postulaciones: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private _empleosService: EmpleosService,
    private _ciudadService: CiudadService,
    private _postulacionesService: PostulacionesService,
    private router: Router
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
  }

  public verPerfil(postulanteId: any, postulacion: any) {
    this.router.navigate(['/perfil-postulante', postulanteId, postulacion]);
  }
}
