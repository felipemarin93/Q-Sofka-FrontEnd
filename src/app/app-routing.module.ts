import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from "./components/inicio/inicio.component";
import { TableroCoachComponent } from './components/tablero-coach/tablero-coach.component';
import { CreacionPreguntasComponentComponent } from './components/creacion-preguntas-component/creacion-preguntas-component.component';

const routes: Routes = [
  { path: "", redirectTo: "/creacionpreguntas", pathMatch: "full" },
  { path: "creacionpreguntas", component: CreacionPreguntasComponentComponent },
  { path: 'coach-dashboard', component: TableroCoachComponent },
  { path: "", redirectTo: "/inicio", pathMatch: "full" },
  { path: "inicio", component: InicioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
