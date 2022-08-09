import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { AutenticacionInicioSesionService } from 'src/app/services/autenticacion-inicio-sesion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  userData: any;
  constructor(
    private autenticacionInicioSesion: AutenticacionInicioSesionService,
    private router: Router
  ) {
  }

  ngOnInit(): void {}

  verificarCredenciales(nombreUsuario: string, contrasena: string) {
    if (nombreUsuario !== '' && contrasena !== '') {
      if (nombreUsuario.includes('.')) {
        this.autenticacionInicioSesion
          .obtenerUsuarioPorNombreUsuario(nombreUsuario)
          .subscribe((usuario1) => {
            if (usuario1 != null) {
              if (usuario1.contrasena === contrasena) {
                this.router.navigate(['coach-dashboard']);
                localStorage.setItem("name",JSON.stringify([usuario1.id, usuario1.nombre]))
              } else {
                alert('La contraseña es incorrecta');
              }
            } else {
              alert(
                'Usuario no registrado, contactarse con el superadmin para el registro y entrega de sus credenciales.'
              );
            }
          });
      } else {
        alert('El nombre de usuario no es válido');
      }
    } else {
      alert('El usuario y la contraseña no pueden estar vacíos');
    }
  }
 
  recuperarContrasena(nombreUsuario: string){
    if(nombreUsuario !== ''){
      this.autenticacionInicioSesion
          .obtenerUsuarioPorNombreUsuario(nombreUsuario)
          .subscribe(usuario=>{
            console.log(usuario)
            this.autenticacionInicioSesion.getSendEmail(usuario.id)
            .subscribe(email=>alert('Una nueva contraseña ha sido generada y enviada al correo registrado'))
          })
    }
  }
}
