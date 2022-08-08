import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})

export class EvaluacionComponent implements OnInit {

  forma: FormGroup | any;
  
  preguntas: Pregunta[] = [
    {
      tipoPregutna: "verdadero o falso",
      pregunta: "¿Pregunta V o F?",
      opciones: {
        opcion1: "verdadero",
        opcion2: "falso",
      }
    },
    {
      tipoPregutna: "seleccion multiple",
      pregunta: "¿Pregunta seleccion multiple?",
      opciones: {
        opcion1: "respuesta1",
        opcion2: "respuesta2",
        opcion3: "respuesta3",
        opcion4: "respuesta4"
      }
    },
    {
      tipoPregutna: "seleccion unica",
      pregunta: "¿Pregunta seleccion unica?",
      opciones: {
        opcion1: "respuesta1",
        opcion2: "respuesta2",
        opcion3: "respuesta3",
        opcion4: "respuesta4"
      }
    }
  ]

  indexPregunta = 0; 
  preguntaMostrada: Pregunta = this.preguntas[this.indexPregunta];

  constructor( private fb: FormBuilder ) { 

  }

  ngOnInit(): void {

    this.crearFormulario();
  }

  get preguntaNoValida(){
    
    if(this.preguntaMostrada.tipoPregutna == "seleccion multiple"){
      return this.forma.get('multiple').invalid
    }

    return this.forma.get('pregunta').invalid;
  }

  crearFormulario(){

    // configurcion del objeto (formulario)
    this.forma = this.fb.group({
      pregunta: ['', Validators.required],
      //unica: ['', Validators.required],
      multiple: ['', Validators.required]
    });

  }

  siguientePregunta(){
    this.crearFormulario();
    this.indexPregunta++;
    this.preguntaMostrada = this.preguntas[this.indexPregunta];

    console.log(this.preguntaMostrada);
  }

  enviarEvaluacion(){
    this.siguientePregunta()
    console.log(this.forma);
    
  }

  
}

interface Pregunta {
  tipoPregutna: string;
  pregunta: string;
  opciones: {
    opcion1: string;
    opcion2: string;
    opcion3?: string;
    opcion4?: string;
  }
} 
