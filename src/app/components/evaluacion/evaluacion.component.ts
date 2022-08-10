import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css'],
})
export class EvaluacionComponent implements OnInit {
  minutos: number;
  segundos: number;
  minutosMostrar: string;
  segundosMostrar: string;

  forma: FormGroup | any;

  preguntas: any[] = [
    {
      tipoPregutna: 'verdadero o falso',
      pregunta: '¿Pregunta V o F?',
      opciones: {
        opcion1: 'verdadero',
        opcion2: 'falso',
      },
    },
    {
      tipoPregutna: 'seleccion multiple',
      pregunta: '¿Pregunta seleccion multiple?',
      opciones: {
        opcion1: 'respuesta1',
        opcion2: 'respuesta2',
        opcion3: 'respuesta3',
        opcion4: 'respuesta4',
      },
    },
    {
      tipoPregutna: 'seleccion unica',
      pregunta: '¿Pregunta seleccion unica?',
      opciones: {
        opcion1: 'respuesta1',
        opcion2: 'respuesta2',
        opcion3: 'respuesta3',
        opcion4: 'respuesta4',
      },
    },
  ];

  indexPregunta = 0;
  preguntaMostrada: any = this.preguntas[this.indexPregunta];

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
    this.minutos = 59;
    this.segundos = 59;
    this.segundosMostrar = `${this.segundos}`;
    this.minutosMostrar = `${this.minutos}`;
    setInterval(() => this.timer(), 1000);
  }

  timer(): void {
    this.segundos--;
    this.segundosMostrar = `${this.segundos}`;
    if (this.segundos < 10 && this.segundos >= 0) {
      this.segundosMostrar = `0${this.segundos}`;
    }
    if (this.segundos < 0) {
      this.segundos = 59;
      this.segundosMostrar = `${this.segundos}`;
      this.minutos--;
      this.minutosMostrar = `${this.minutos}`;
    }
    if (this.minutos < 10 && this.minutos >= 0) {
      this.minutosMostrar = `0${this.minutos}`;
    }
    if (this.minutos === 0 && this.segundos === 0) {
      this.enviarEvaluacion();
    }
  }

  ngOnInit(): void {}

  get preguntaNoValida() {
    if (this.preguntaMostrada.tipoPregutna == 'seleccion multiple') {
      return this.forma.get('multiple').invalid;
    }

    return this.forma.get('pregunta').invalid;
  }

  // configurcion del objeto (formulario)
  crearFormulario() {
    if (this.preguntaMostrada.tipoPregutna == 'seleccion multiple') {
      this.forma = this.fb.group({
        multiple: ['', Validators.required],
      });
    } else {
      this.forma = this.fb.group({
        pregunta: ['', Validators.required],
      });
    }
  }

  siguientePregunta() {
    this.crearFormulario();
    this.indexPregunta++;
    this.preguntaMostrada = this.preguntas[this.indexPregunta];

    console.log(this.preguntaMostrada);
  }

  enviarEvaluacion() {
    this.siguientePregunta();
    console.log(this.forma);
  }

  imprimir() {
    console.log(this.preguntaMostrada);

    console.log(this.forma);
  }
}
