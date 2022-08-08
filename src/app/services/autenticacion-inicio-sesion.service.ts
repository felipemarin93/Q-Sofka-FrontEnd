import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionInicioSesionService {
  private usuarioUrl = '/api/usuario/nombre-usuario';

  constructor(private httpClient: HttpClient, private router: Router) {}

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  // };

  // obtenerUsuarioPorNombreUsuario(nombreUsuario: string): Observable<Usuario> {
  //   return this.httpClient.get<Usuario>(
  //     `${this.usuarioUrl}/${nombreUsuario}`,
  //     this.httpOptions
  //   );
  // }

  obtenerUsuarioPorNombreUsuario(nombreUsuario: string): Observable<Usuario> {
    return this.httpClient
      .get<Usuario>(`${this.usuarioUrl}/${nombreUsuario}`)
      .pipe(tap((_) => console.log('fetched usuario')));
  }
}
