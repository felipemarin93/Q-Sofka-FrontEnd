import { Component, OnInit } from '@angular/core';
import { PreguntasService } from '../preguntas.service';
import { Pregunta } from './Pregunta';

@Component({
  selector: 'app-tablero-coach',
  templateUrl: './tablero-coach.component.html',
  styleUrls: ['./tablero-coach.component.css']
})
export class TableroCoachComponent implements OnInit {

  preguntas: Pregunta[] = [];
  pagina: number = 1
  constructor(private preguntasService: PreguntasService) { }

  ngOnInit(): void {
      this.preguntas = this.getPreguntas();
  }
  getPreguntas(): Pregunta[] {
    return this.preguntasService.getPreguntas();
  }

}
