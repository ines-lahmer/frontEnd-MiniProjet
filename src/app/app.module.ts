
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { LayoutComponent } from './layout/layout.component';
import { EnseignantComponent } from './enseignant/enseignant.component';
import { ListeseanceComponent } from './listeseance/listeseance.component';
<<<<<<< HEAD
import { EliminationComponent } from './elimination/elimination.component';
=======
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { ForbiddenComponent } from './access/forbidden/forbidden.component';
import { NotFoundComponent } from './access/not-found/not-found.component';
import { LogoutComponent } from './Authentication/logout/logout.component';
import { AuthGuard } from './guard/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
>>>>>>> 81413b7ce2bd10d7b41731ce982fd49cd153f263



@NgModule({
  declarations: [
    AppComponent,
    EtudiantComponent,
    LayoutComponent,
    EnseignantComponent,
    ListeseanceComponent,
<<<<<<< HEAD
    EliminationComponent
=======
    LoginComponent,
    RegisterComponent,
    ForbiddenComponent,
    NotFoundComponent,
    LogoutComponent
>>>>>>> 81413b7ce2bd10d7b41731ce982fd49cd153f263

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule ,
    CommonModule,


ToastrModule.forRoot({
       timeOut:10000,
       positionClass: 'toast-top-right',
       preventDuplicates:true,
     }),


  ],
  providers: [AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
