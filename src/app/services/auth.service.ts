import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { UtilsService } from './utils-service.service';
import { LoginResponse } from '../models/login-response';
import { AuthStatus } from '../models/auth-status.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _currentUser  = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor(
    private http: HttpClient,
    private utilsSvc: UtilsService
  ) { }

  private setAuthentication = ( user: User, token: string ) => {
    
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    this.utilsSvc.saveInLocalStorage('user', {...user, token});
    return true;

  }

  public login = ( username: string, password: string ): Observable<boolean> => {

    const url: string = `${this.baseUrl}/auth/login`;
    const body = {username, password};

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map( ({user, token}) => this.setAuthentication(user, token) )
      )

  }

  public register( user: any ): Observable<{ok: boolean, msg: string}> {

    const url: string = `${this.baseUrl}/employee`;

    return this.http.post<{ok: boolean, msg: string}>(url, user)

  }

  public revalidarToken(): Observable<boolean>{

    const url: string = `${this.baseUrl}/auth/revalidar`;
    const user = this.utilsSvc.getFromLocalStorage('user');
    if(!user){
      this._authStatus.set(AuthStatus.noAuthenticated);
      return of(false);
    }

    const headers = new HttpHeaders()
      .set('authorization', `Bearer ${user.token}`)

    return this.http.get<LoginResponse>(url, {headers})
      .pipe(
        map(({user, token}) => this.setAuthentication(user, token)),
        catchError((err) => {
          this._authStatus.set(AuthStatus.noAuthenticated);
          return of(false)
        })
      )
  }

  public async logout(){
    const loading = await this.utilsSvc.loading({
      duration: 2000
    });
    this._authStatus.set(AuthStatus.noAuthenticated);
    this._currentUser.set(null);
    loading.present()
    this.utilsSvc.routerLink('/auth')
    localStorage.removeItem('user');
    
  }
}
