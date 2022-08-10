import { Component, OnInit } from '@angular/core';
import { PreguntasService } from '../../services/preguntas.service';
import { Pregunta } from '../../models/pregunta';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tablero-coach',
  templateUrl: './tablero-coach.component.html',
  styleUrls: ['./tablero-coach.component.css'],
})
export class TableroCoachComponent implements OnInit {
  preguntas: Pregunta[] = [];

  usuario?: any = { id: '', nombre: '' };
  pagina: number = 1;
  title: string = "Bienvenido/a ";
  preguntaDetalle?: Pregunta;
  displayModal = "none";


  constructor(
    private preguntasService: PreguntasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsuario();
    this.getPreguntas();


  }
  getUsuario() {
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario')!);
      this.title = this.title + this.usuario.nombre;
    }
  }

  getPreguntas(): void {
    this.preguntasService.getPreguntasCoach(this.usuario.id)
      .subscribe(preguntas => {
        this.preguntas = preguntas;
      });
  }

  mostrarDetalle(preguntaActual: Pregunta) {
    this.preguntaDetalle = preguntaActual;
    this.displayModal = 'block';
  }

  cerrarDetalle() {
    this.displayModal = 'none';
  }

  cerrarSesion() {
    Swal.fire({
      title: '¿seguro que deseas salir?',
      text: "los cambios sin guardar se borrarán",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, salir!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'cerrado exitosamente!',
        )
        localStorage.clear();
        this.router.navigate(['inicio']);
      }
    })
   
  }

  nuevaPregunta() {
    this.router.navigate(['creacionpreguntas']);
  }

  eliminarPregunta(preguntaEliminar: Pregunta) {
    if (confirm('¿Está seguro que quiere eliminar la pregunta?')) {
      this.preguntasService
        .deletePregunta(preguntaEliminar.id)
        .subscribe((eliminar) => {
          alert('Se ha eliminado la pregunta con id:' + preguntaEliminar.id);
          // window.location.reload()
          const indice = this.preguntas.indexOf(preguntaEliminar);
          this.preguntas.splice(indice, 1);
        });
    }
  }

  editarPregunta(preguntaEditar: Pregunta) {
    this.router.navigate(['creacionpreguntas/' + preguntaEditar.id]);
    // alert('IR A VISTA EDITAR: : ' + preguntaEditar.id);
  }
}
