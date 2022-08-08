import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pregunta } from '../models/pregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  constructor() { }

  getPreguntas(): Pregunta[]{
    const preguntas: Pregunta[] = [
      {id:"a1",pregunta:"test1",areaConocimiento:"area1",ultimaEdicion:new Date(), opciones: []},
      {id:"a2",pregunta:"test2",areaConocimiento:"area2",ultimaEdicion:new Date(), opciones: []},
      {id:"a3",pregunta:"test",areaConocimiento:"area1",ultimaEdicion:new Date(), opciones: []},
      {id:"a4",pregunta:"test",areaConocimiento:"area2",ultimaEdicion:new Date(), opciones: []},
      {id:"a5",pregunta:"test",areaConocimiento:"area1",ultimaEdicion:new Date(), opciones: []},
      {id:"a6",pregunta:"test",areaConocimiento:"area2",ultimaEdicion:new Date(), opciones: []},
      {id:"a7",pregunta:"test",areaConocimiento:"area1",ultimaEdicion:new Date(), opciones: []},
      {id:"a8",pregunta:"test",areaConocimiento:"area2",ultimaEdicion:new Date(), opciones: []},
      {id:"a9",pregunta:"test",areaConocimiento:"area1",ultimaEdicion:new Date(), opciones: []},
      {id:"a10",pregunta:"test",areaConocimiento:"area2",ultimaEdicion:new Date(), opciones: []},
      {id:"a11",pregunta:"test",areaConocimiento:"area1",ultimaEdicion:new Date(), opciones: []},
      {id:"a12",pregunta:"test",areaConocimiento:"area2",ultimaEdicion:new Date(), opciones: []},
      {id:"a13",pregunta:"test",areaConocimiento:"area1",ultimaEdicion:new Date(), opciones: []},
      {id:"a14",pregunta:"test",areaConocimiento:"area2",ultimaEdicion:new Date(), opciones: []},
      {id:"a15",pregunta:"tes1",areaConocimiento:"area1",ultimaEdicion:new Date(), opciones: []},
      {id:"a16",pregunta:"test",areaConocimiento:"area2",ultimaEdicion:new Date(), opciones: []},
    ];
    return preguntas;
  }

}
