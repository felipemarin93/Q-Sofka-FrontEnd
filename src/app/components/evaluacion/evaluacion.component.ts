import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css'],
})
export class EvaluacionComponent implements OnInit {
  private subscripcion: Subscription;
  timeDifference: number;
  secondsToDday: number;
  minutesToDday: number;
  fechaActual: Date = new Date();
  fechaFinal: Date;
  milliSecondsInASecond: number = 1000;
  minutesInAnHour: number = 60;
  SecondsInAMinute: number = 60;

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

  constructor(private fb: FormBuilder, private cookieService: CookieService) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.fechaFinal = new Date(parseInt(this.cookieService.get('Fecha Final')));
    this.subscripcion = interval(1000).subscribe((elemento) => {
      this.getTimeDifference();
      if (this.minutesToDday === 0 && this.secondsToDday === 0) {
        this.subscripcion.unsubscribe();
        //TODO LLamar al método que finaliza la evaluación, el del botón finalizar
      }
    });
  }

  private getTimeDifference() {
    this.timeDifference = this.fechaFinal.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference: number) {
    this.secondsToDday = Math.floor(
      (timeDifference / this.milliSecondsInASecond) % this.SecondsInAMinute
    );
    this.minutesToDday = Math.floor(
      (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour)) %
        this.SecondsInAMinute
    );
  }

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
