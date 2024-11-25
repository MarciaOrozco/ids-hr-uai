import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CrearEmpleadoService } from '../../../services/crear-empleado.service';

@Component({
    selector: 'app-eliminar-empleado-modal',
    imports: [],
    templateUrl: './eliminar-empleado-modal.component.html',
    styleUrl: './eliminar-empleado-modal.component.scss'
})
export class EliminarEmpleadoModalComponent implements OnInit {
  @Input() empleadoId: any = null;
  public empleado: any = '';
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() confirmDeleteEvent = new EventEmitter<void>();

  constructor(private _empleadosService: CrearEmpleadoService) {}

  ngOnInit() {
    if (this.empleadoId !== null) {
      this._empleadosService
        .verEmpleado(this.empleadoId)
        .subscribe((empleado) => {
          this.empleado = empleado;
        });
    }
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  confirmDelete() {
    if (this.empleadoId !== null) {
      this._empleadosService
        .eliminarEmpleado(this.empleadoId)
        .subscribe((res) => {
          this.confirmDeleteEvent.emit();
        });
    }
  }
}
