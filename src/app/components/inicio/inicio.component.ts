import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { error } from 'console';
import { Usuario } from 'src/app/models/usuario';
import { AutenticacionInicioSesionService } from 'src/app/services/autenticacion-inicio-sesion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
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
          .subscribe((usuario1) => {
              if (usuario1.contrasena === contrasena) {
                this.router.navigate(['coach-dashboard']);
              } else {
                alert('La contraseña es incorrecta');
              }
          }, error => {
            alert(
              'Usuario no registrado, contactarse con el superadmin para el registro y entrega de sus credenciales.'
            );
          });
      } else {
        alert('El nombre de usuario no es válido');
      }
    } else {
      alert('El usuario y la contraseña no pueden estar vacíos');
    }
  }
}
