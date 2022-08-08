import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pregunta } from './components/tablero-coach/pregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  constructor() { }

  getPreguntas(): Pregunta[]{
    const preguntas: Pregunta[] = [
      {id:"a1",pregunta:"test1",areaConocimiento:"area1",ultimaEdicion:Date.now(), opciones: []},
      {id:"a2",pregunta:"test2",areaConocimiento:"area2",ultimaEdicion:Date.now(), opciones: []},
      {id:"a3",pregunta:"test",areaConocimiento:"area1",ultimaEdicion:Date.now(), opciones: []},
      {id:"a4",pregunta:"test",areaConocimiento:"area2",ultimaEdicion:Date.now(), opciones: []},
      {id:"a5",pregunta:"test",areaConocimiento:"area1",ultimaEdicion:Date.now(), opciones: []},
      {id:"a6",pregunta:"test",areaConocimiento:"area2",ultimaEdicion:Date.now(), opciones: []},
      {id:"a7",pregunta:"test",areaConocimiento:"area1",ultimaEdicion:Date.now(), opciones: []},
      {id:"a8",pregunta:"test",areaConocimiento:"area2",ultimaEdicion:Date.now(), opciones: []},
      {id:"a9",pregunta:"test",areaConocimiento:"area1",ultimaEdicion:Date.now(), opciones: []},
      {id:"a10",pregunta:"test",areaConocimiento:"area2",ultimaEdicion:Date.now(), opciones: []},
      {id:"a11",pregunta:"test",areaConocimiento:"area1",ultimaEdicion:Date.now(), opciones: []},
      {id:"a12",pregunta:"test",areaConocimiento:"area2",ultimaEdicion:Date.now(), opciones: []},
      {id:"a13",pregunta:"test",areaConocimiento:"area1",ultimaEdicion:Date.now(), opciones: []},
      {id:"a14",pregunta:"test",areaConocimiento:"area2",ultimaEdicion:Date.now(), opciones: []},
      {id:"a15",pregunta:"tes1",areaConocimiento:"area1",ultimaEdicion:Date.now(), opciones: []},
      {id:"a16",pregunta:"test",areaConocimiento:"area2",ultimaEdicion:Date.now(), opciones: []},
    ];
    return preguntas;
  }

}
