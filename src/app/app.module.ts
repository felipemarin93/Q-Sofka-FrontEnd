import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreguntasService } from './preguntas.service';
import { TableroCoachComponent } from './tablero-coach/tablero-coach.component';

@NgModule({
  declarations: [
    AppComponent,
    TableroCoachComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  providers: [PreguntasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
