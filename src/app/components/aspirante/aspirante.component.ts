import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Aspirante } from 'src/app/models/aspirante';
import { AspiranteService } from 'src/app/services/aspirante.service';

@Component({
  selector: 'app-aspirante',
  templateUrl: './aspirante.component.html',
  styleUrls: ['./aspirante.component.css']
})

export class AspiranteComponent implements OnInit {

  formaDatos: FormGroup | any;
  formaCodigo: FormGroup | any;

  //codigoValido: boolean = false;

  constructor( private fb: FormBuilder,
              private aspiranteService: AspiranteService ) {
    this.crearFormulario();
    //this.crearListeners();
   }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.formaDatos = this.fb.group({
      nombre:['', [Validators.required, Validators.minLength(5)]],
      email:['', [Validators.required, Validators.pattern('[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$')]]
    })

    this.formaCodigo = this.fb.group({
      codigo:['', [Validators.required, Validators.minLength(5)],]
    })
  }

  
  get nombreNoValido(){
    return this.formaDatos.get('nombre').invalid && this.formaDatos.get('nombre').touched;
  }

  get emailNoValido(){
    return this.formaDatos.get('email').invalid && this.formaDatos.get('email').touched;
  }

  get codigoNoValido(){
    return this.formaCodigo.get('codigo').invalid && this.formaCodigo.get('codigo').touched;
  }


  // crearListeners(){
  //   this.formaCodigo.valueChanges.subscribe( (valor: any) => console.log(valor)
  //   )

  //   this.formaCodigo.statusChanges.subscribe( (status: any) => console.log({status})
  //   )
  // }

  solicitarCodigo(){
    if(this.formaDatos.invalid){
      Object.values( this.formaDatos.controls ).forEach ((control: any)=> {
        control.markAsTouched();})
    }

    this.crearAspirante()
  }

  crearAspirante(){
    const data: Aspirante = {
      nombre: this.formaDatos.get('nombre').value,
      correo: this.formaDatos.get('email').value
    } 

    this.aspiranteService.crearAspirante(data).subscribe( data => console.log(data))
  }

  comenzar(){
    const codigoVerificacion = this.formaCodigo.get('codigo').value;
    
    this.obtenerAspirante(codigoVerificacion).subscribe(data => console.log(data));
  }


  // aceptarcodigo(){
  //   this.codigoValido = true
  // }

  //Validacion asincrona
  // validarCodigo( control: FormControl ): Promise<any> | Observable<any>{

  //   const codigoVerificacion = control.value;

  //   return this.obtenerAspirante(codigoVerificacion).pipe(map(((data:any) => {
  //     if(data != null) {
  //       console.log("token valido")
  //       return true;
  //     }
  //     return false;
  //   })));
  // }

  //Validacion con boton
  validarCodigo( codigoVerificacion: string ){
    return this.obtenerAspirante(codigoVerificacion).subscribe(data => console.log(data));
  }

  obtenerAspirante(codigoVerificacion: string){
    return this.aspiranteService.obtenerAspirantePorCodigoVerificacion(codigoVerificacion)
  }

}

