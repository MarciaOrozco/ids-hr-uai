import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isPostulante: boolean = false;
  public loggedIn: boolean = false;

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this._userService.isLoggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });

    this._userService.userGroup$.subscribe((res: any) => {
      if (res && res.Grupo && res.Grupo.Nombre === 'Postulante') {
        this.isPostulante = true;
      } else {
        this.isPostulante = false;
      }
    });
  }

  public logout() {
    this._userService.logout();
  }
}
