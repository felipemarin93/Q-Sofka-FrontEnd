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
  userData: any;
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
    if (nombreUsuario !== '' && contrasena !== '') {
      if (nombreUsuario.includes('.')) {
        this.autenticacionInicioSesion
          .obtenerUsuarioPorNombreUsuario(nombreUsuario)
          .subscribe(
            (usuario1) => {
              if (usuario1 == null) {
                alert(
                  'Usuario no registrado, contactarse con el superadmin para el registro y entrega de sus credenciales.'
                );
              }
              if (usuario1.contrasena === contrasena) {
                localStorage.setItem(
                  'usuario',
                  JSON.stringify({ id: usuario1.id, nombre: usuario1.nombre })
                );
                this.router.navigate(['coach-dashboard']);
              } else {
                alert('La contraseña es incorrecta');
              }
            }
          );
      }
    }
  }

  recuperarContrasena(nombreUsuario: string) {
    if (nombreUsuario !== '') {
      this.autenticacionInicioSesion
        .obtenerUsuarioPorNombreUsuario(nombreUsuario)
        .subscribe((usuario) => {
          console.log(usuario);
          this.autenticacionInicioSesion
            .getSendEmail(usuario.id)
            .subscribe((email) =>
              alert(
                'Una nueva contraseña ha sido generada y enviada al correo registrado'
              )
            );
        });
    }
  }
}
