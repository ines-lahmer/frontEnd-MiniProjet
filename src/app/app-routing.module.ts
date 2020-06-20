import { AuthGuard } from './guard/auth.guard';
import { LogoutComponent } from './Authentication/logout/logout.component';
import { ForbiddenComponent } from './access/forbidden/forbidden.component';
import { NotFoundComponent } from './access/not-found/not-found.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { LoginComponent } from './Authentication/login/login.component';
import { ListeseanceComponent } from './listeseance/listeseance.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Etudiant } from './classes/etudiant';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { LayoutComponent } from './layout/layout.component';
import { EnseignantComponent } from './enseignant/enseignant.component';



const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'logout',component:LogoutComponent},
  {
    path:'',
    component: LayoutComponent,
    canActivate:[AuthGuard],
    data:{roles:['ROLE_ADMIN']},
    children: [

      { path: 'etudiant', component: EtudiantComponent }

    ]},

    {path:'enseignant', component:LayoutComponent,
    canActivate:[AuthGuard],
    data:{roles:['ROLE_ENSEIGNANT']},
    children : [
      {path:'seance/:idSeance',component:EnseignantComponent},
      {path:'seance',component:ListeseanceComponent}
    ]},
    {path:'404',component:NotFoundComponent},
    {path:'403',component:ForbiddenComponent},
    {path:'**',component:NotFoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
