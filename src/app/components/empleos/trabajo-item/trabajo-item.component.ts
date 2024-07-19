import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EmpleosService } from '../../../services/empleos.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-trabajo-item',
  standalone: true,
  imports: [NgFor],
  templateUrl: './trabajo-item.component.html',
  styleUrl: './trabajo-item.component.scss',
})
export class TrabajoItemComponent implements OnChanges {
  @Input() searchText: string = '';
  public empleos: any[] = [];
  public filteredEmpleos: any[] = [];
  public userId: any = '';
  public isPostulante: boolean = false;

  constructor(
    private _empleosService: EmpleosService,
    private _userService: UserService,
    public router: Router
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId')!;
    this._userService.getUserGrupo(this.userId).subscribe((res: any) => {
      if (res.Grupo.Nombre === 'Postulante') {
        this.isPostulante = true;
      }
    });

    this._empleosService.getEmpleos().subscribe((res) => {
      this.empleos = res;

      let pendingHabilidades = this.empleos.length;
      this.empleos.forEach((empleo) => {
        this._empleosService
          .getHabilidadesEmpleo(empleo.id)
          .subscribe((habilidades) => {
            empleo.habilidades = habilidades;

            pendingHabilidades--;
            if (pendingHabilidades === 0) {
              this.filterEmpleos();
            }
          });
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchText']) {
      this.filterEmpleos();
    }
  }

  private filterEmpleos() {
    this.filteredEmpleos = this.empleos.filter((empleo) => {
      const tituloMatch = empleo.Titulo.toLowerCase().includes(this.searchText);
      const habilidadesMatch = empleo.habilidades.some((habilidad: any) =>
        habilidad.TipoHabilidad.Tipo.toLowerCase().includes(this.searchText)
      );
      return tituloMatch || habilidadesMatch;
    });
  }

  public modificarEmpleo(empleoId: number) {
    this.router.navigate(['/modificar-empleo/', empleoId]);
  }

  public verDetalleEmpleo(empleoId: number) {
    this.router.navigate(['/detalle-empleo/', empleoId]);
  }

  public navegarPostulaciones(empleoId: number) {
    this.router.navigate(['/ver-postulaciones/', empleoId]);
  }
}
