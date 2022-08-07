import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {

  forma: FormGroup | any;
  
  //preguntas = [];

  constructor( private fb: FormBuilder ) { 

    this.crearFormulario();

  }

  ngOnInit(): void {
  }

  get preguntaNoValida(){
    
    return this.forma.get('preguntaX').invalid;
  }

  crearFormulario(){

    // configurcion del objeto (formulario)
    this.forma = this.fb.group({
      preguntaX: ['', Validators.required],
      flexRadioDefault: ['', Validators.required]
    });

  }

  siguientePregunta(){
    console.log("siguiente");
  }

  enviarEvaluacion(){
    console.log(this.forma);
    
  }

  preguntas = [
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
}
