import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  verificarCredenciales(nombreUsuario: string) {
    console.log("verificar")
    this.autenticacionInicioSesion
      .obtenerUsuarioPorNombreUsuario(nombreUsuario)
      .subscribe((usuario: Usuario) => {
        if (usuario.nombre !== null) {
          if (usuario.nombre.includes('.')) {
            this.router.navigate(['coach-dashboard']);
          } else {
            alert('El nombre de usuario no es válido');
          }
        } else {
          alert(
            'Usuario no registrado, contactarse con el superadmin para el registro y entrega de sus credenciales.'
          );
        }
      });
  }
}
