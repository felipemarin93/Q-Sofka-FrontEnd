import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpServiceAreaConocimientoService } from 'src/app/services/http-service-area-conocimiento.service';
import { AreaConocimiento } from '../../models/areaConocimiento';
import { Descriptor } from '../../models/descriptor';

@Component({
  selector: 'app-editar-pregunta',
  templateUrl: './editar-pregunta.component.html',
  styleUrls: ['./editar-pregunta.component.css']
})
export class EditarPreguntaComponent implements OnInit, AfterContentChecked {

  forma: FormGroup | any;
  tipoPregunta: string[] = ["Verdadero o Falso", "Selección única", "Selección múltiple"];

  areas: AreaConocimiento[] = [];
  descriptores: any = [];

  constructor(private fb: FormBuilder,
              private areaConocimientoService: HttpServiceAreaConocimientoService
        ) { 

    this.crearFormulario();
    this.obtenerAreas();

  }

  ngOnInit(): void {
  }

  ngAfterContentChecked(){
    this.llenarFormulario()
  }

  crearFormulario(){
    this.forma = this.fb.group({
      tipo:['', [Validators.required]],
      area:["", [Validators.required]],
      descriptor:['', [Validators.required]]
      })

  }


  llenarFormulario(  ){
    
    let areaForm = "62f150244ae273561594ddda";
    this.areas.forEach(area => {
      if(area.id == areaForm){
        this.descriptores = area.descriptores;        
      }
    })
    console.log(this.descriptores);
    
    this.forma.setValue({
      tipo:"1",
      area: areaForm,
      descriptor: "1"
    })
  }

  enviarPregunta(){
    console.log("Pregunta enviada");
    console.log(this.forma);
    console.log(this.areas);
    
    this.llenarFormulario();
    
    console.log(this.descriptores);
  }

  obtenerAreas(){
    this.areaConocimientoService.listarAreaConocimiento()
    .subscribe(data => {
      data.forEach((area: AreaConocimiento) => this.areas.push(area))
    });
  }

  llenarDescriptores(){
    const idArea = this.forma.get('area').value;
    this.areas.forEach(area => {
      if(area.id == idArea){
        this.descriptores = area.descriptores;        
      }
      //area.descriptores.forEach(e => {this.descriptores.push(e)})
    })
  }


}
