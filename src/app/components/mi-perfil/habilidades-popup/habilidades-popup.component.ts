import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostulanteService } from '../../../services/postulante.service';
import { NgFor, NgIf } from '@angular/common';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-habilidades-popup',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './habilidades-popup.component.html',
  styleUrl: './habilidades-popup.component.scss',
})
export class HabilidadesPopupComponent implements OnInit {
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() confirmModifyEvent = new EventEmitter<number>();
  @Input() postulanteId!: number | undefined;
  public habilidades: any = [];
  public filteredHabilidades: string[] = [];
  public habilidadesControl = new FormControl('');
  public selectedHabilidades: string[] = [];
  public dropdownOpen = false;

  constructor(private _postulanteService: PostulanteService) {}

  ngOnInit(): void {
    this._postulanteService.getTipoHabilidades().subscribe((res: any[]) => {
      this.habilidades = res.map((habilidad) => habilidad.Tipo);
      this.filteredHabilidades = this.habilidades;
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

  public closeModal() {
    this.closeModalEvent.emit();
  }

  addHabilidad(): void {
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

    const habilidad: any = {
      PostulanteId: this.postulanteId,
      habilidad: selectedHabilidad,
    };
    this._postulanteService.agregarHabilidad(habilidad).subscribe();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('.habilidades-container')) {
      this.dropdownOpen = false;
    }
  }

  onInputClick(): void {
    this.dropdownOpen = true;
  }
}
