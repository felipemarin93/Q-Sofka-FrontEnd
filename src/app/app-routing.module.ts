import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableroCoachComponent } from './tablero-coach/tablero-coach.component';

const routes: Routes = [
  { path: 'coach-dashboard', component: TableroCoachComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
