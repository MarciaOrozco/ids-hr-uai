import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CrearEmpleadoService } from '../../../services/crear-empleado.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modificar-role',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modificar-role.component.html',
  styleUrl: './modificar-role.component.scss',
})
export class ModificarRoleComponent {
  @Input() empleadoId: any = null;
  public empleado: any = '';
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() confirmChangeEvent = new EventEmitter<void>();

  userRol = new FormGroup({
    empleadoId: new FormControl(''),
    rol: new FormControl(''),
  });

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

  confirmChangeRol() {
    const userRol: any = {
      id: this.empleadoId,
      rol: this.userRol.value.rol,
    };

    if (this.empleadoId !== null) {
      this._empleadosService.modificarRolEmpleado(userRol).subscribe((res) => {
        this.confirmChangeEvent.emit();
      });
    }
  }
}
