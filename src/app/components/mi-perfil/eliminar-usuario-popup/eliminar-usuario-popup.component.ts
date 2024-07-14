import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-eliminar-usuario-popup',
  standalone: true,
  imports: [],
  templateUrl: './eliminar-usuario-popup.component.html',
  styleUrl: './eliminar-usuario-popup.component.scss',
})
export class EliminarUsuarioPopupComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  @Input() postulanteId!: number | undefined;

  public closeModal() {
    this.closeModalEvent.emit();
  }
}
