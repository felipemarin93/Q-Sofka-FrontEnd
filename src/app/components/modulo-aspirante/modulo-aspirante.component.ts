import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modulo-aspirante',
  templateUrl: './modulo-aspirante.component.html',
  styleUrls: ['./modulo-aspirante.component.css']
})

export class ModuloAspiranteComponent implements OnInit {

  forma: FormGroup | any ;
  
  constructor( private fb: FormBuilder ) {
    this.crearFormulario();
    }

  ngOnInit(): void {
    
  }

  crearFormulario(){
    
    this.forma = this.fb.group({
      nombre: ['',]
    })

  }

  comenzar(){
    console.log("el test ha comenzado");
    console.log(this.forma);
    
  }

}
