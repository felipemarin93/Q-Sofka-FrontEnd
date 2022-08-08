import { Component, OnInit } from '@angular/core';
import { PreguntasService } from '../../services/preguntas.service';
import { Pregunta } from '../../models/pregunta';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-tablero-coach',
  templateUrl: './tablero-coach.component.html',
  styleUrls: ['./tablero-coach.component.css']
})
export class TableroCoachComponent implements OnInit {

  preguntas: any[] = [];
  pagina: number = 1
  title:string = "Bienvenido/a Coach"
  constructor(
    private preguntasService: PreguntasService,
    private router: Router) { }

  ngOnInit(): void {
      this.preguntas = this.getPreguntas();
  }
  getPreguntas(): any[] {
    return this.preguntasService.getPreguntas();
  }

  cerrarSesion(){
    var sesion= window.confirm("¿seguro que deseas salir?")
    if(sesion==true){
      this.router.navigate(['inicio']);
    }
  }

  nuevaPregunta(){
    this.router.navigate(['creacionpreguntas']);
  }
}
