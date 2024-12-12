import { Component } from '@angular/core';
import { EmpleosService } from '../../../services/empleos.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { PostulanteService } from '../../../services/postulante.service';

@Component({
  selector: 'app-empleos-sugeridos',
  imports: [NgFor],
  templateUrl: './empleos-sugeridos.component.html',
  styleUrl: './empleos-sugeridos.component.scss',
})
export class EmpleosSugeridosComponent {
  public empleos: any[] = [];
  public userId: any = '';
  public postulanteId: string | null = '';
  public porcentajesConcordancia: { [key: number]: number } = {};
  public habilidadesComunes: { [key: number]: number } = {};
  constructor(
    private _empleosService: EmpleosService,
    public router: Router,
    private _postulanteService: PostulanteService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId')!;

    this._postulanteService
      .getPostulante(this.userId)
      .subscribe((postulante: any) => {
        this.postulanteId = postulante.id;

        this._empleosService.getEmpleos().subscribe((res) => {
          this.empleos = res;

          this.empleos.forEach((empleo) => {
            this._empleosService
              .getHabilidadesEmpleo(empleo.id)
              .subscribe((habilidades) => {
                empleo.habilidades = habilidades;

                if (this.postulanteId) {
                  this._postulanteService
                    .getConcordancia(empleo.id, this.postulanteId)
                    .subscribe((concordancia: any) => {
                      const porcentaje = concordancia.porcentajeConcordancia;
                      if (porcentaje > 0) {
                        this.porcentajesConcordancia[empleo.id] = porcentaje;
                        this.habilidadesComunes[empleo.id] =
                          concordancia.habilidadesComunes;
                      } else {
                        this.empleos = this.empleos.filter(
                          (e) => e.id !== empleo.id
                        );
                      }
                    });
                }
              });
          });
        });
      });
  }

  public verDetalleEmpleo(empleoId: number) {
    this.router.navigate(['/detalle-empleo/', empleoId]);
  }
}
