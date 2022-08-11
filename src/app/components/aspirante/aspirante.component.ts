import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-aspirante',
  templateUrl: './aspirante.component.html',
  styleUrls: ['./aspirante.component.css'],
})
export class AspiranteComponent implements OnInit {
  formaDatos: FormGroup | any;
  formaCodigo: FormGroup | any;

  constructor(private fb: FormBuilder, private cookieService: CookieService, private router: Router) {
    this.crearFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {}

  timer(): void {
    console.log("timer");
    let fechaActual = Date.parse(new Date().toString());
    let fechaFinal = fechaActual + 3601000;
    this.cookieService.set(
      'Fecha Inicio',
      JSON.stringify(fechaActual),
      new Date(fechaFinal)
    );
    this.cookieService.set(
      'Fecha Final',
      JSON.stringify(fechaFinal),
      new Date(fechaFinal)
    );
    this.router.navigate(['/evaluacion']);
  }

  private validarEspacio(control: AbstractControl){
    var espacio = control.value;
    var error = null;
    if (!espacio.includes(" ")){
      error = "Debes escribir nommbre espacio apellido";
    }
    return error;
  }

  crearFormulario(){
    this.formaDatos = this.fb.group({
     
      nombre:['', [Validators.required, this.validarEspacio,Validators.minLength(9)]],
      email:['', [Validators.required, Validators.pattern('[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$')]]
    })

    this.formaCodigo = this.fb.group({
      codigo: [
        '',
        [Validators.required, Validators.minLength(5)],
        [this.validarCodigo],
      ],
    });
  }

  crearListeners() {
    this.formaCodigo.valueChanges.subscribe((valor: any) => console.log(valor));

    this.formaCodigo.statusChanges.subscribe((status: any) =>
      console.log({ status })
    );
  }

  get nombreNoValido() {
    return (
      this.formaDatos.get('nombre').invalid &&
      this.formaDatos.get('nombre').touched
    );
  }

  get emailNoValido() {
    return (
      this.formaDatos.get('email').invalid &&
      this.formaDatos.get('email').touched
    );
  }

  get codigoNoValido() {
    return (
      this.formaCodigo.get('codigo').invalid &&
      this.formaCodigo.get('codigo').touched
    );
  }

  solicitarCodigo() {
    if (this.formaDatos.invalid) {
      Object.values(this.formaDatos.controls).forEach((control: any) => {
        control.markAsTouched();
      });
    }
  }

  validarCodigo(control: FormControl): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'abc1234') {
          console.log('token valido');

          resolve({ existe: false });
        } else {
          console.log('token no valido');
        }
      }, 1500);
    });
  }

  comenzar() {
    console.log(this.formaCodigo);
  }
}

