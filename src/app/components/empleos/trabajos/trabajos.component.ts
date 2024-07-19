import { Component } from '@angular/core';
import { TrabajoItemComponent } from '../trabajo-item/trabajo-item.component';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-trabajos',
  standalone: true,
  imports: [TrabajoItemComponent],
  templateUrl: './trabajos.component.html',
  styleUrl: './trabajos.component.scss',
})
export class TrabajosComponent {
  public userId: any = '';
  public isPostulante: boolean = false;
  public searchText: string = '';

  constructor(private _userService: UserService, public router: Router) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId')!;
    this._userService.getUserGrupo(this.userId).subscribe((res: any) => {
      if (res.Grupo.Nombre === 'Postulante') {
        this.isPostulante = true;
      }
    });
  }

  public crearEmpleo() {
    this.router.navigate(['/crear-empleo']);
  }

  onSearchTextChange(event: any) {
    this.searchText = event.target.value.toLowerCase();
  }
}
