import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aspirante } from '../models/aspirante';
import { PathRest } from '../static/hostBackend';

@Injectable({
  providedIn: 'root'
})
export class AspiranteService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  crearAspirante(aspirante: Aspirante ){
    return this.http.post( PathRest.getApiAspirante, aspirante, this.httpOptions);
  }

  obtenerAspirantePorCodigoVerificacion(CodigoVerificacion: string){
    return this.http.get( `${PathRest.getApiAspirante}/comenzar/${CodigoVerificacion}`,
    this.httpOptions);
  }

  generarCoidigoVerificacion( idAspirante: string){
    return this.http.get( `${PathRest.getApiAspirante}/codigo/${idAspirante}`,
    this.httpOptions);
  }
}
