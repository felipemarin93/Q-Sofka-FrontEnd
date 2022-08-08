import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { ModuloAspiranteComponent } from './modulo-aspirante/modulo-aspirante.component';
=======
import { InicioComponent } from './components/inicio/inicio.component';


import { PreguntasService } from './services/preguntas.service';
import { TableroCoachComponent } from './components/tablero-coach/tablero-coach.component';
import { CreacionPreguntasComponentComponent } from './components/creacion-preguntas-component/creacion-preguntas-component.component';
import { HeaderComponentComponent } from './components/header-component/header-component.component';
import { FooterComponentComponent } from './components/footer-component/footer-component.component';
import { CookieService } from 'ngx-cookie-service';
>>>>>>> origin/dev

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    ModuloAspiranteComponent
=======
    InicioComponent,
    TableroCoachComponent,
    CreacionPreguntasComponentComponent,
    HeaderComponentComponent,
    FooterComponentComponent
>>>>>>> origin/dev
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [PreguntasService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
