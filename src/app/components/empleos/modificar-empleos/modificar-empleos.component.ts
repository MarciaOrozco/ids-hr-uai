import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleosService } from '../../../services/empleos.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Ciudades, Pais, Provincia } from '../../../interfaces/ciudad';
import { CiudadService } from '../../../services/ciudad.service';
import { NgFor } from '@angular/common';
import { debounceTime } from 'rxjs';
import { PostulanteService } from '../../../services/postulante.service';

@Component({
  selector: 'app-modificar-empleos',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './modificar-empleos.component.html',
  styleUrl: './modificar-empleos.component.scss',
})
export class ModificarEmpleosComponent implements OnInit {
  public empleoId: string | null = '';
  public paises: Pais[] = [];
  public provincias: Provincia[] = [];
  public ciudades: Ciudades[] = [];
  public paisSeleccionado: boolean = false;
  public provinciaSeleccionada: boolean = false;
  public ciudadSeleccionada: boolean = false;
  public filteredHabilidades: string[] = [];
  public habilidadesControl = new FormControl('');
  public selectedHabilidades: string[] = [];
  public originalHabilidades: string[] = [];
  public habilidades: any = [];
  public dropdownOpen = false;
  public empleoForm = new FormGroup({
    titulo: new FormControl(''),
    descripcion: new FormControl(''),
    empresa: new FormControl(''),
    pais: new FormControl(''),
    provincia: new FormControl(''),
    ciudad: new FormControl(''),
    esRemoto: new FormControl(''),
    residencia: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private _empleosService: EmpleosService,
    private _ciudadService: CiudadService,
    public router: Router,
    private _postulanteService: PostulanteService
  ) {}

  ngOnInit(): void {
    this.empleoId = this.route.snapshot.paramMap.get('id');

    this._empleosService.getEmpleo(this.empleoId).subscribe((empleo) => {
      if (empleo) {
        this.empleoForm.patchValue({
          titulo: empleo.empleo.Titulo,
          descripcion: empleo.empleo.Descripcion,
          empresa: empleo.empleo.Cliente.NombreEmpresa,
          esRemoto: empleo.empleo.esRemoto ? 'remoto' : 'presencial',
        });

        empleo.habilidades.forEach((habilidad: any) => {
          this.selectedHabilidades.push(habilidad.TipoHabilidad.Tipo);
          this.originalHabilidades.push(habilidad.TipoHabilidad.Tipo);
        });
        if (empleo.empleo.CiudadId) {
          this.ciudadSeleccionada = true;
          this._ciudadService
            .getCiudad(empleo.empleo.CiudadId)
            .subscribe((residencia) => {
              this.empleoForm.patchValue({
                residencia:
                  residencia.ciudad +
                  ', ' +
                  residencia.provincia +
                  ', ' +
                  residencia.pais,
              });
            });
        }
      }
    });

    this._postulanteService.getTipoHabilidades().subscribe((res: any[]) => {
      this.habilidades = res.map((habilidad) => habilidad.Tipo);
      this.filteredHabilidades = this.habilidades;
    });

    this._ciudadService.getPaises().subscribe((paises) => {
      this.paises = paises;
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('.habilidades-container')) {
      this.dropdownOpen = false;
    }
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

  public modificarEmpleo() {
    const updatedEmpleo = {
      id: this.empleoId,
      titulo: this.empleoForm.value.titulo,
      descripcion: this.empleoForm.value.descripcion,
      ciudadId: this.empleoForm.value.ciudad,
      remoto: this.empleoForm.value.esRemoto === 'remoto' ? true : false,
      empresa: this.empleoForm.value.empresa,
    };

    const habilidadesEliminadas = this.originalHabilidades.filter(
      (habilidad) => !this.selectedHabilidades.includes(habilidad)
    );

    const habilidadesAgregadas = this.selectedHabilidades.filter(
      (habilidad) => !this.originalHabilidades.includes(habilidad)
    );

    this.guardarHabilidades(habilidadesAgregadas);
    this.eliminarHabilidades(habilidadesEliminadas);

    this._empleosService.modificarEmpleo(updatedEmpleo).subscribe((res) => {
      this.router.navigate(['/trabajos']);
    });
  }

  public guardarHabilidades(habilidadesNuevas: any) {
    habilidadesNuevas.forEach((habilidadNombre: string) => {
      const habilidad: any = {
        EmpleoId: this.empleoId,
        habilidad: habilidadNombre,
      };
      this._empleosService.agregarHabilidad(habilidad).subscribe();
    });
  }

  public eliminarHabilidades(habilidadesEliminadas: any) {
    habilidadesEliminadas.forEach((habilidadNombre: string) => {
      this._empleosService
        .eliminarHabilidad(this.empleoId, habilidadNombre)
        .subscribe();
    });
  }

  public eliminarEmpleo() {
    if (this.empleoId !== null) {
      this._empleosService.eliminarEmpleo(this.empleoId).subscribe((res) => {
        this.router.navigate(['/trabajos']);
      });
    }
  }
  public cancelar() {
    this.router.navigate(['/trabajos']);
  }

  public onInputClick(): void {
    this.dropdownOpen = true;
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

  public eliminarHabilidad(habilidad: any) {
    const index = this.selectedHabilidades.findIndex(
      (h: any) => h.id === habilidad.id
    );
    if (index !== -1) {
      this.selectedHabilidades.splice(index, 1);
    }
  }
}
