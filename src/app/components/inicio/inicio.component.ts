import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AutenticacionInicioSesionService } from 'src/app/services/autenticacion-inicio-sesion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  resultado!: string;

  formularioIngreso = new FormGroup({
    usuario: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]+[.]+[a-zA-Z]*'),
    ]),
    contrasena: new FormControl('', [Validators.required]),
  });

  submit() {
    if (this.formularioIngreso.valid)
      this.resultado = 'Todos los datos son válidos';
    else this.resultado = 'Hay datos inválidos en el formulario';
  }

  constructor(
    private autenticacionInicioSesion: AutenticacionInicioSesionService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  verificarCredenciales(nombreUsuario: string, contrasena: string) {
    if (nombreUsuario.includes('.') && contrasena !== "") {
      this.autenticacionInicioSesion
        .obtenerUsuarioPorNombreUsuario(nombreUsuario)
        .subscribe((usuario1) => {
          if (usuario1 == null) {
            alert(
              'Usuario no registrado, contactarse con el superadmin para el registro y entrega de sus credenciales.'
            );
          }
          if (usuario1.contrasena === contrasena) {
            this.router.navigate(['coach-dashboard']);
          } else {
            alert('Datos incorrectos');
          }
        });
    }
  }
}
