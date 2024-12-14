import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isPostulante: boolean = false;
  public isAdmin: boolean = false;
  public isEmpleado: boolean = false;
  public loggedIn: boolean = false;
  public userId = '';

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this._userService.isLoggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });

    this.userId = localStorage.getItem('userId')!;

    this._userService.userGroup$.subscribe((res: any) => {
      if (res && res.Grupo && res.Grupo.Nombre === 'Postulante') {
        this.isPostulante = true;
      } else if (res && res.Grupo && res.Grupo.Nombre === 'Admin') {
        this.isAdmin = true;
      } else {
        this.isEmpleado = true;
      }
    });
  }

  public logout() {
    this._userService.logout(this.userId);
  }
}
