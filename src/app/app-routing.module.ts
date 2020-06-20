import { ListeseanceComponent } from './listeseance/listeseance.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Etudiant } from './classes/etudiant';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { LayoutComponent } from './layout/layout.component';
import { EnseignantComponent } from './enseignant/enseignant.component';



const routes: Routes = [
  {
    path:'',
    component: LayoutComponent,
    children: [

      { path: 'etudiant', component: EtudiantComponent }

    ]},

    {path:'enseignant', component:LayoutComponent,
    children : [
      {path:'seance/:idSeance',component:EnseignantComponent},
      {path:'seance',component:ListeseanceComponent}
    ]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
