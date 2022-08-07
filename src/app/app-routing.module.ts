import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreacionPreguntasComponentComponent } from './components/creacion-preguntas-component/creacion-preguntas-component.component';

const routes: Routes = [
  { path: "", redirectTo: "/creacionpreguntas", pathMatch: "full" },
  { path: "creacionpreguntas", component: CreacionPreguntasComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
