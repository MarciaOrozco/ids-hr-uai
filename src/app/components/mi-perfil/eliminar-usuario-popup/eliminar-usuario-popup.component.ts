import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostulanteService } from '../../../services/postulante.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-eliminar-usuario-popup',
  imports: [],
  templateUrl: './eliminar-usuario-popup.component.html',
  styleUrl: './eliminar-usuario-popup.component.scss',
})
export class EliminarUsuarioPopupComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  public userId = '';

  constructor(
    private _postulanteService: PostulanteService,
    public _userService: UserService
  ) {}

  public closeModal() {
    this.closeModalEvent.emit();
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId')!;
  }

  public eliminarUsuario() {
    this._postulanteService.eliminarPostulante(this.userId).subscribe((res) => {
      this._userService.logout(this.userId);
    });
  }
}
