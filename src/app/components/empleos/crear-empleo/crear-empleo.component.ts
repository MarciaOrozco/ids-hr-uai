import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CiudadService } from '../../../services/ciudad.service';
import { Ciudades, Pais, Provincia } from '../../../interfaces/ciudad';
import { NgFor } from '@angular/common';
import { PostulanteService } from '../../../services/postulante.service';
import { debounceTime } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { EmpleosService } from '../../../services/empleos.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-crear-empleo',
    imports: [ReactiveFormsModule, NgFor],
    templateUrl: './crear-empleo.component.html',
    styleUrl: './crear-empleo.component.scss'
})
export class CrearEmpleoComponent {
  empleo = new FormGroup({
    titulo: new FormControl(''),
    descripcion: new FormControl(''),
    empresa: new FormControl(''),
    pais: new FormControl(''),
    provincia: new FormControl(''),
    ciudad: new FormControl(''),
    esRemoto: new FormControl(''),
  });

  public paises: Pais[] = [];
  public provincias: Provincia[] = [];
  public ciudades: Ciudades[] = [];
  public paisSeleccionado: boolean = false;
  public provinciaSeleccionada: boolean = false;
  public ciudadSeleccionada: boolean = false;
  public habilidades: any = [];
  public filteredHabilidades: string[] = [];
  public habilidadesControl = new FormControl('');
  public selectedHabilidades: string[] = [];
  public dropdownOpen = false;
  public userId = '';
  public personaId: any;

  constructor(
    private _ciudadService: CiudadService,
    private _postulanteService: PostulanteService,
    private _userService: UserService,
    private _empleosService: EmpleosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId')!;

    this._ciudadService.getPaises().subscribe((paises) => {
      this.paises = paises;
    });

    this._postulanteService.getTipoHabilidades().subscribe((res: any[]) => {
      this.habilidades = res.map((habilidad) => habilidad.Tipo);
      this.filteredHabilidades = this.habilidades;
    });

    this._userService.getPersonaInfo(this.userId).subscribe((res: any) => {
      this.personaId = res.id;
    });

    this.habilidadesControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value: any) => {
        this.filterHabilidades(value);
      });
  }

  private filterHabilidades(value: string): void {
    const filterValue = value.toLowerCase();
    this.filteredHabilidades = this.habilidades.filter((habilidad: any) =>
      habilidad.toLowerCase().includes(filterValue)
    );
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

  onInputClick(): void {
    this.dropdownOpen = true;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('.habilidades-container')) {
      this.dropdownOpen = false;
    }
  }

  public addHabilidad(): void {
    const selectedHabilidad = this.habilidadesControl.value;
    if (
      selectedHabilidad &&
      !this.selectedHabilidades.includes(selectedHabilidad)
    ) {
      this.selectedHabilidades.push(selectedHabilidad);
    }
    this.habilidadesControl.setValue('');
    this.filteredHabilidades = this.habilidades;
    this.dropdownOpen = false;
  }

  public agregarEmpleo() {
    const empleo: any = {
      titulo: this.empleo.value.titulo,
      empresa: this.empleo.value.empresa,
      descripcion: this.empleo.value.descripcion,
      remoto: this.empleo.value.esRemoto === 'remoto' ? true : false,
      ciudadId: this.empleo.value.ciudad,
      personaId: this.personaId,
    };

    this._empleosService.crearEmpleo(empleo).subscribe((res) => {
      this.guardarHabilidades(res.empleoId);
    });

    this.router.navigate(['/trabajos']);
  }

  public guardarHabilidades(nuevoEmpleoId: number) {
    this.selectedHabilidades.forEach((habilidadNombre: string) => {
      const habilidad: any = {
        EmpleoId: nuevoEmpleoId,
        habilidad: habilidadNombre,
      };
      this._empleosService.agregarHabilidad(habilidad).subscribe();
    });
  }

  public cancelar() {
    this.router.navigate(['/trabajos']);
  }
}
