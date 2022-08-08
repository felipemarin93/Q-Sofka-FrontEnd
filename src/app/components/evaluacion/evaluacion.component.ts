import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pregunta } from 'src/app/models/pregunta';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css'],
})

export class EvaluacionComponent implements OnInit {
  forma: FormGroup | any;

  preguntas: Pregunta[] = [];

  indexPregunta = 0;
  preguntaMostrada: Pregunta = this.preguntas[this.indexPregunta];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.crearFormulario();
  }

  get preguntaNoValida() {
    if (this.preguntaMostrada.tipoPregunta == 'seleccion multiple') {
      return this.forma.get('multiple').invalid;
    }

    return this.forma.get('pregunta').invalid;
  }

  crearFormulario() {
    // configurcion del objeto (formulario)
    this.forma = this.fb.group({
      pregunta: ['', Validators.required],
      //unica: ['', Validators.required],
      multiple: ['', Validators.required],
    });
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
}
