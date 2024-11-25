import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EliminarEmpleadoModalComponent } from '../eliminar-empleado-modal/eliminar-empleado-modal.component';
import { CrearEmpleadoService } from '../../../services/crear-empleado.service';
import { NgFor } from '@angular/common';
import { Empleado } from '../../../interfaces/empleado';
import { ModificarEmpleadoModalComponent } from '../modificar-empleado-modal/modificar-empleado-modal.component';
import { ModificarRoleComponent } from '../modificar-role/modificar-role.component';

@Component({
    selector: 'app-empleados-item',
    imports: [
        EliminarEmpleadoModalComponent,
        NgFor,
        ModificarEmpleadoModalComponent,
        ModificarRoleComponent,
    ],
    templateUrl: './empleados-item.component.html',
    styleUrl: './empleados-item.component.scss'
})
export class EmpleadosItemComponent implements OnInit {
  public empleados: any = [];
  public selectedEmpleadoId: any = null;
  public isModalOpen = false;
  public isModalModificarOpen = false;
  public isModalModificarRoleOpen = false;

  constructor(private _empleadosService: CrearEmpleadoService) {}

  ngOnInit() {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this._empleadosService.verEmpleados().subscribe((empleados: Empleado) => {
      this.empleados = empleados;
    });
  }

  @ViewChild('fileInput') fileInput!: ElementRef;
  user = {
    img: '',
  };

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.img = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  abrirModal(id: number) {
    this.selectedEmpleadoId = id;
    this.isModalOpen = true;
  }

  abrirModalModificar(id: number) {
    this.selectedEmpleadoId = id;
    this.isModalModificarOpen = true;
  }

  abrirModalModificarRol(id: number) {
    this.selectedEmpleadoId = id;
    this.isModalModificarRoleOpen = true;
  }

  cerrarModal() {
    this.isModalOpen = false;
    this.isModalModificarOpen = false;
    this.selectedEmpleadoId = null;
    this.isModalModificarRoleOpen = false;
  }

  eliminarEmpleado() {
    this.cerrarModal();
    this.cargarEmpleados();
  }

  modificarEmpleado() {
    this.cerrarModal();
    this.cargarEmpleados();
  }

  getRolName(grupoId: number): string {
    const rolesMap: any = {
      1: 'Postulante',
      2: 'Empleado',
      3: 'Administrador',
    };
    return rolesMap[grupoId] || 'Desconocido';
  }
}
