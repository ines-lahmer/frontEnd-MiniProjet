
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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



@NgModule({
  declarations: [
    AppComponent,
    EtudiantComponent,
    LayoutComponent,
    EnseignantComponent,
    ListeseanceComponent

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
