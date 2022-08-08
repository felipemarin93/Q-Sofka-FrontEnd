import { Component, OnInit } from '@angular/core';
import { PreguntasService } from '../../services/preguntas.service';
import { Pregunta } from '../../models/pregunta';


@Component({
  selector: 'app-tablero-coach',
  templateUrl: './tablero-coach.component.html',
  styleUrls: ['./tablero-coach.component.css']
})
export class TableroCoachComponent implements OnInit {

  preguntas: any[] = [];
  pagina: number = 1
  title:string = "Bienvenido/a Coach"
  constructor(private preguntasService: PreguntasService) { }

  ngOnInit(): void {
      this.preguntas = this.getPreguntas();
  }
  getPreguntas(): any[] {
    return this.preguntasService.getPreguntas();
  }

}
