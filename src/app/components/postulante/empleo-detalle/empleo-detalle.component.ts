import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpleosService } from '../../../services/empleos.service';
import { CiudadService } from '../../../services/ciudad.service';
import { Ciudades, Pais, Provincia } from '../../../interfaces/ciudad';
import { NgFor } from '@angular/common';
import { PostulanteService } from '../../../services/postulante.service';

@Component({
  selector: 'app-empleo-detalle',
  standalone: true,
  imports: [NgFor],
  templateUrl: './empleo-detalle.component.html',
  styleUrl: './empleo-detalle.component.scss',
})
export class EmpleoDetalleComponent {
  empleoId: string | null = '';
  postulanteId: string | null = '';
  postulaciones: any;
  public paises: Pais[] = [];
  public provincias: Provincia[] = [];
  public ciudades: Ciudades[] = [];
  public empleo: any;
  public empleoOrigen: any;
  public userId: any = '';
  public yaPostulado: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private _empleosService: EmpleosService,
    private _ciudadService: CiudadService,
    private _postulanteService: PostulanteService
  ) {}

  ngOnInit(): void {
    this.empleoId = this.route.snapshot.paramMap.get('id');
    this.userId = localStorage.getItem('userId')!;

    this._empleosService.getEmpleo(this.empleoId).subscribe((empleo) => {
      this.empleo = empleo;
      this._ciudadService
        .getCiudad(this.empleo.empleo.CiudadId)
        .subscribe((res) => {
          this.empleoOrigen = res;
        });
    });

    this._postulanteService
      .getPostulante(this.userId)
      .subscribe((postulante: any) => {
        this.postulanteId = postulante.id;

        this._postulanteService
          .getPostulacion(this.empleoId!, this.postulanteId!)
          .subscribe((res) => {
            if (res) {
              this.yaPostulado = true;
            }
          });
      });
  }

  public aplicarEmpleo() {
    const postulacion: any = {
      empleoId: this.empleoId,
      postulanteId: this.postulanteId,
      estadoId: 1,
    };

    this._postulanteService.aplicarEmpleo(postulacion).subscribe();
  }
}
