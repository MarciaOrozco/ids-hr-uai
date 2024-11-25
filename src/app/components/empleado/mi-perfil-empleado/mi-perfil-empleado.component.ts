import { Component, ElementRef, ViewChild } from '@angular/core';
import { EliminarEmpleadoModalComponent } from '../eliminar-empleado-modal/eliminar-empleado-modal.component';
import { ModificarEmpleadoModalComponent } from '../modificar-empleado-modal/modificar-empleado-modal.component';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { CrearEmpleadoService } from '../../../services/crear-empleado.service';

@Component({
    selector: 'app-mi-perfil-empleado',
    imports: [EliminarEmpleadoModalComponent, ModificarEmpleadoModalComponent],
    templateUrl: './mi-perfil-empleado.component.html',
    styleUrl: './mi-perfil-empleado.component.scss'
})
export class MiPerfilEmpleadoComponent {
  public userId = '';
  public empleadoId: any;
  public isModalOpen = false;
  public isModalModificarOpen = false;
  public email: string = '';
  public nombre: string = '';
  public apellido: string = '';

  constructor(
    private _userService: UserService,
    private router: Router,
    private _empleadoService: CrearEmpleadoService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId')!;
    this.cargarEmpleado();
  }

  public cargarEmpleado() {
    this._userService.getUserGrupo(this.userId).subscribe((res: any) => {
      this.email = res.Email;
    });

    this._empleadoService.getEmpleadoId(this.userId).subscribe((res: any) => {
      this.nombre = res.Persona.Nombre;
      this.apellido = res.Persona.Apellido;
      this.empleadoId = res.id;
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

  abrirModal() {
    this.isModalOpen = true;
  }

  abrirModalModificar() {
    this.isModalModificarOpen = true;
  }

  cerrarModal() {
    this.isModalOpen = false;
    this.isModalModificarOpen = false;
  }

  eliminarEmpleado() {
    this.cerrarModal();
    this.cargarEmpleado();
  }

  modificarEmpleado() {
    this.cerrarModal();
    this.cargarEmpleado();
  }

  public modificarClave() {
    this.router.navigate(['/cambiar-clave']);
  }
}
