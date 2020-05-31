import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Etudiant } from './classes/etudiant';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  {
    path:'',
    component: LayoutComponent,
    children: [
      
      { path: 'etudiant', component: EtudiantComponent },
     
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
