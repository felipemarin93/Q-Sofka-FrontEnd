import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-creacion-preguntas-component',
  templateUrl: './creacion-preguntas-component.component.html',
  styleUrls: ['./creacion-preguntas-component.component.css'],
})
export class CreacionPreguntasComponentComponent implements OnInit {
  title = 'Agregar Pregunta';
  tiposPregunta: string[] = [];
  areasConocimiento: string[] = [];
  descriptores: string[] = [];
  opcionesTipoPregunta: string[] = [
    'Opción múltiple',
    'Única opción',
    'Verdadero o falso',
  ];
  opcionesAreaConocimiento: string[] = [
    'Client-side',
    'Server-side',
    'Buenas prácticas',
    'Metodología',
  ];
  opcionesDescriptores: string[] = ['Programación reactiva'];
  opciones: string[] = [];
  tipoPregunta: string = 'Seleccione una opcion';
  areaConocimiento: string = 'Seleccione una opcion';
  descriptor: string = 'Seleccione una opcion';
  pregunta?: string;
  opcion?: string;

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    if (this.cookieService.get('tipoPregunta') !== '') {
      this.tipoPregunta = this.cookieService.get('tipoPregunta');
    }
    if (this.cookieService.get('areaConocimiento') !== '') {
      this.areaConocimiento = this.cookieService.get('areaConocimiento');
    }
    if (this.cookieService.get('descriptor') !== '') {
      this.descriptor = this.cookieService.get('descriptor');
    }
    if (JSON.parse(localStorage.getItem('opciones')!)) {
      this.opciones = JSON.parse(localStorage.getItem('opciones')!);
    }
    this.pregunta = this.cookieService.get('pregunta');
  }

  persistirOpcion(namekey: string, value: string) {
    this.cookieService.set(
      namekey,
      value,
      this.obtenerLimiteCookie(new Date())
    );
  }

  obtenerLimiteCookie(fecha: Date): Date {
    return new Date(Date.parse(fecha.toString()) + 1200000);
  }

  agregarOpcion() {
    this.opciones.push(this.opcion!);
    localStorage.setItem('opciones', JSON.stringify(this.opciones));
    this.opcion = '';
  }

  eliminarOpcion(opcion: string) {
    let item = this.opciones.findIndex((element) => element == opcion);
    this.opciones.splice(item, 1);
    localStorage.setItem('opciones', JSON.stringify(this.opciones));
    console.log(item);
  }

  editarOpcion(indice: number) {
    this.opcion = this.opciones[indice];
    console.log(this.opciones[indice]);
  }

  guardarPregunta() {
    this.cookieService.deleteAll('/');
    localStorage.removeItem('opciones');
  }
}
