import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Opcion } from '../models/opcion';
import { Pregunta } from '../models/pregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  constructor() { }


  getPreguntas(): Pregunta[]{
    const ops: Opcion[] = [{nombre:"opcion 1",esCorrecto:false},{nombre:"opcion 2",esCorrecto:true},]
    const preguntas: Pregunta[] = [
      {id:"1",pregunta:"test1",areaConocimiento:"area1",fecha:new Date(), opciones: ops,coachId:'1a',tipoPregunta:'tipo',descriptor:'des'},
      {id:"2",pregunta:"test2",areaConocimiento:"area2",fecha:new Date(), opciones: ops,coachId:'1a',tipoPregunta:'tipo',descriptor:'des'},
      {id:"3",pregunta:"test3",areaConocimiento:"area1",fecha:new Date(), opciones: ops,coachId:'1a',tipoPregunta:'tipo',descriptor:'des'},
      {id:"4",pregunta:"test4",areaConocimiento:"area2",fecha:new Date(), opciones: ops,coachId:'1a',tipoPregunta:'tipo',descriptor:'des'},
      {id:"5",pregunta:"test5",areaConocimiento:"area1",fecha:new Date(), opciones: ops,coachId:'1a',tipoPregunta:'tipo',descriptor:'des'},
      {id:"6",pregunta:"test6",areaConocimiento:"area2",fecha:new Date(), opciones: ops,coachId:'1a',tipoPregunta:'tipo',descriptor:'des'},
      {id:"7",pregunta:"test7",areaConocimiento:"area3",fecha:new Date(), opciones: ops,coachId:'1a',tipoPregunta:'tipo',descriptor:'des'},
      {id:"8",pregunta:"test8",areaConocimiento:"area4",fecha:new Date(), opciones: ops,coachId:'1a',tipoPregunta:'tipo',descriptor:'des'},
      {id:"9",pregunta:"test9",areaConocimiento:"area1",fecha:new Date(), opciones: ops,coachId:'1a',tipoPregunta:'tipo',descriptor:'des'},
      {id:"10",pregunta:"test10",areaConocimiento:"area2",fecha:new Date(), opciones: ops,coachId:'1a',tipoPregunta:'tipo',descriptor:'des'},
      {id:"11",pregunta:"test11",areaConocimiento:"area3",fecha:new Date(), opciones: ops,coachId:'1a',tipoPregunta:'tipo',descriptor:'des'},
      {id:"12",pregunta:"test12",areaConocimiento:"area3",fecha:new Date(), opciones: ops,coachId:'1a',tipoPregunta:'tipo',descriptor:'des'},
      {id:"13",pregunta:"test13",areaConocimiento:"area4",fecha:new Date(), opciones: ops,coachId:'1a',tipoPregunta:'tipo',descriptor:'des'},
      {id:"14",pregunta:"test14",areaConocimiento:"area5",fecha:new Date(), opciones: ops,coachId:'1a',tipoPregunta:'tipo',descriptor:'des'},
      {id:"15",pregunta:"tes15",areaConocimiento:"area1",fecha:new Date(), opciones: ops,coachId:'1a',tipoPregunta:'tipo',descriptor:'des'},
      {id:"16",pregunta:"test pregunta bastante larga y probamos como se ve",areaConocimiento:"area2",fecha:new Date(), opciones: ops,coachId:'1a',tipoPregunta:'tipo',descriptor:'des'},

    ];


    return preguntas;
  }

}
