import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {
  idPregunta?: string;
  puntosPrueba1?: number;
  puntosPrueba2?: number;
  title = '¡Hola, futuro sofkiano!';
  constructor(
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.idPregunta = this.activateRoute.snapshot.params['id'];
  }

}
