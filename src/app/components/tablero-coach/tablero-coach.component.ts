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

  preguntas: Pregunta[] = [];

  usuario?: any ={id:'', nombre:''};
  pagina: number = 1;
  title:string = "Bienvenido/a";
  preguntaDetalle?:Pregunta;
  displayModal ="none";

  constructor(
    private preguntasService: PreguntasService,
    private router: Router) { }


  ngOnInit(): void {
      this.getPreguntas();
      this.getUsuario();
  }
  getUsuario() {
    if(localStorage.getItem('usuario')){
      this.usuario = localStorage.getItem('usuario');
      this.title = this.title + this.usuario.nombre;
    }
  }

  getPreguntas(): void {
    this.preguntasService.getPreguntasCoach(this.usuario.id)
    .subscribe(preguntas => {
      this.preguntas = preguntas;
    });
  }


  mostrarDetalle(preguntaActual:Pregunta){
    this.preguntaDetalle = preguntaActual;
    this.displayModal= "block";
  }

  cerrarDetalle(){
    this.displayModal = "none";
  }

  cerrarSesion(){
    let sesion= window.confirm("¿seguro que deseas salir?")
    if(sesion==true){
      this.router.navigate(['inicio']);
    }
  }

  nuevaPregunta(){
    this.router.navigate(['creacionpreguntas']);
  }

  eliminarPregunta(preguntaEliminar:Pregunta){
      alert('DELETE: ' + preguntaEliminar.id);
  }

  editarPregunta(preguntaEditar:Pregunta){
    alert('IR A VISTA EDITAR: : ' + preguntaEditar.id);
  }
}
