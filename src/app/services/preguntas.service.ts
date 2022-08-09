import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Pregunta } from '../models/pregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {
  preguntaUrl:string = 'http://localhost:8080/api/pregunta/listar';
  constructor(private http: HttpClient) { }


  getPreguntas(): Observable<Pregunta[]>{
    return this.http.get<Pregunta[]>(this.preguntaUrl)

    .pipe(
      catchError(this.handleError<Pregunta[]>('getPreguntas', []))
    );
  }


  getPreguntasCoach(id: string) {
    return this.http.get<Pregunta[]>(this.preguntaUrl.concat('coach/'+id))
    .pipe(
      catchError(this.handleError<Pregunta[]>('getPreguntasCoach', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead


      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
