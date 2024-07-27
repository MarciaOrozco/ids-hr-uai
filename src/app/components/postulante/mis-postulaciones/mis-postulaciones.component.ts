import { Component } from '@angular/core';
import { PostulanteService } from '../../../services/postulante.service';
import { PostulacionesService } from '../../../services/postulaciones.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-mis-postulaciones',
  standalone: true,
  imports: [NgClass],
  templateUrl: './mis-postulaciones.component.html',
  styleUrl: './mis-postulaciones.component.scss',
})
export class MisPostulacionesComponent {
  public userId: any = '';
  public postulaciones: any[] = [];
  constructor(
    private _postulanteService: PostulanteService,
    private _postulacionesService: PostulacionesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId')!;
    this.loadData();
  }

  public cancelarPostulacion(postulacionId: any) {
    this._postulacionesService
      .eliminarPostulacion(postulacionId)
      .subscribe((res) => {
        this.loadData();
      });
  }

  public loadData() {
    this._postulanteService
      .getPostulante(this.userId)
      .subscribe((postulante) => {
        this._postulacionesService
          .getPostulacionDePostulante(postulante.id)
          .subscribe((postulaciones) => {
            this.postulaciones = postulaciones;
          });
      });
  }

  public navegarEmpleoDetalle(empleoId: any) {
    this.router.navigate(['/detalle-empleo/' + empleoId]);
  }
}
