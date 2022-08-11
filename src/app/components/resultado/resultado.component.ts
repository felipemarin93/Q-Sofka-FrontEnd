import { AfterContentChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Aspirante } from 'src/app/models/aspirante';
import { AspiranteService } from 'src/app/services/aspirante.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit, AfterContentChecked {
  title = '¡Hola, futuro sofkiano!';
  idEvaluacion?: string;
  puntosPrueba1?: number;
  puntosPrueba2?: number;
  aspirante?: Aspirante;
  mensajeMostrar: string = '';
  fase: string = 'Canteras 2'
  valoracion?: number


  constructor(
    private activateRoute: ActivatedRoute,
    private httpServiceAspirante: AspiranteService
  ) { }

  ngOnInit(): void {
    this.idEvaluacion = this.activateRoute.snapshot.params['id'];
    this.obtenerAspirante()
  }

  ngAfterContentChecked(): void {
    this.validarPuntos()
  }

  obtenerAspirante(): void {
    this.httpServiceAspirante.obtenerAspirantePorEvaluacion(this.idEvaluacion!)
      .subscribe(data => {
        this.aspirante = data
      })
  }

  validarPuntos(): void {
    this.valoracion = (this.aspirante?.puntajePrueba1! * 30) / 100




  }

}
