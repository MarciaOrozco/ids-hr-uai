import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-eliminar-empleado-modal',
  standalone: true,
  imports: [],
  templateUrl: './eliminar-empleado-modal.component.html',
  styleUrl: './eliminar-empleado-modal.component.scss',
})
export class EliminarEmpleadoModalComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() confirmDeleteEvent = new EventEmitter<void>();

  closeModal() {
    this.closeModalEvent.emit();
  }

  confirmDelete() {
    this.confirmDeleteEvent.emit();
  }
}
