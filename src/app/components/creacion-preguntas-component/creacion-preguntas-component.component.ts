import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-creacion-preguntas-component',
  templateUrl: './creacion-preguntas-component.component.html',
  styleUrls: ['./creacion-preguntas-component.component.css']
})
export class CreacionPreguntasComponentComponent implements OnInit {
  title = "Agregar Pregunta"

  constructor() { }

  ngOnInit(): void {
  }

}
