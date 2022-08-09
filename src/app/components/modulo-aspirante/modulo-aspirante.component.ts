import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modulo-aspirante',
  templateUrl: './modulo-aspirante.component.html',
  styleUrls: ['./modulo-aspirante.component.css']
})
export class ModuloAspiranteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  codigoAcertado: boolean = true;
  codigoIncorrecto: boolean = false;


  verificarCodigo(){
    console.log("Se ha verificado el codigo")
    this.codigoAcertado = true;
    this.codigoIncorrecto = false;
  }
}
