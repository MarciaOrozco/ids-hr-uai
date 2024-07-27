import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Usuario } from '../interfaces/usuarios';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;
  private loggedInSubject: BehaviorSubject<boolean>;
  private userGroupSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users';
    this.loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
    this.userGroupSubject = new BehaviorSubject<any>(this.loadUserGroup());
  }

  public registrarse(user: Usuario): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  public login(user: Usuario): Observable<string> {
    return this.http
      .post<string>(`${this.myAppUrl}${this.myApiUrl}/login`, user)
      .pipe(
        tap((token: string) => {
          localStorage.setItem('token', token);
          const decodedToken = jwtDecode<{ userId: string }>(token);
          localStorage.setItem('userId', decodedToken.userId);
          this.loggedInSubject.next(true);
          this.loadUserGroup();
        })
      );
  }

  public isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  get userGroup$(): Observable<any> {
    return this.userGroupSubject.asObservable();
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.loggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  public sendRecoveryEmail(email: any): Observable<void> {
    return this.http.post<void>(
      `${this.myAppUrl}${this.myApiUrl}/olvido-clave`,
      { email }
    );
  }

  public getUserGrupo(userId: any): Observable<Object> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/getGrupo/` + userId);
  }

  public getPersonaInfo(userId: any): Observable<Object> {
    return this.http.get(
      `${this.myAppUrl}${this.myApiUrl}/getPersona/` + userId
    );
  }

  public patchPersonaInfo(persona: any): Observable<Object> {
    return this.http.post(
      `${this.myAppUrl}${this.myApiUrl}/patchPersona/`,
      persona
    );
  }

  public loadUserGroup() {
    if (this.isLoggedIn()) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.getUserGrupo(userId).subscribe((res: any) => {
          this.userGroupSubject.next(res);
        });
      } else {
        this.userGroupSubject.next(false);
      }
    }
  }

  public cambiarClave(
    claveAnterior: string,
    nuevaClave: string
  ): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.patch(`${this.myAppUrl}${this.myApiUrl}/cambiar-clave`, {
      userId,
      claveAnterior,
      nuevaClave,
    });
  }

  public validarCodigo(
    email: any,
    code: any,
    nuevaClave: any
  ): Observable<void> {
    return this.http.post<void>(
      `${this.myAppUrl}${this.myApiUrl}/validar-codigo`,
      { email, code, nuevaClave }
    );
  }
}
