import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {
  title = '¡Hola, futuro sofkiano!';
  constructor() { }

  ngOnInit(): void {
  }

}
