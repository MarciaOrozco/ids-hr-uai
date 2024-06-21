import { Component, ElementRef, ViewChild } from '@angular/core';
import { EliminarEmpleadoModalComponent } from '../eliminar-empleado-modal/eliminar-empleado-modal.component';

@Component({
  selector: 'app-empleados-item',
  standalone: true,
  imports: [EliminarEmpleadoModalComponent],
  templateUrl: './empleados-item.component.html',
  styleUrl: './empleados-item.component.scss',
})
export class EmpleadosItemComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  user = {
    img: '',
  };
  isModalOpen = false;
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

  cerrarModal() {
    this.isModalOpen = false;
  }

  eliminarEmpleado() {
    // Lógica para eliminar el empleado
    console.log('Empleado eliminado');
    this.cerrarModal();
  }
}
