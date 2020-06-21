import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../services/etudiant.service';
import { EnseignantService } from '../services/enseignant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Etudiant } from '../classes/etudiant';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-elimination',
  templateUrl: './elimination.component.html',
  styleUrls: ['./elimination.component.css']
})
export class EliminationComponent implements OnInit {
  searchterm;
  listematiere:any=[];
  listefiliere:any=[];
  elimination:Etudiant[];
  filiereselected;
  matiereselected;
  filterForm:FormGroup;
  constructor(private EtudiantService: EtudiantService, private EnseignantService: EnseignantService,
    private Router : Router ,private route: ActivatedRoute , private toster: ToastrService) { }

  ngOnInit(): void {
    this.filterForm = new FormGroup(
      { filiere:new FormControl('' , [Validators.required]),
        matiere:new FormControl('' , [Validators.required]),
      
      });

      this.getfilere();
      this.getmatiere();
      }

 onfilter(){
  let idfil= this.filiereselected._id;
  let idmat=this.matiereselected._id;
  this.getelimination(idfil,idmat)
}


getelimination(idfil,idmat){
  this.EtudiantService.getElimination(idfil,idmat).subscribe(
  res=>{this.elimination=res;
  console.log('elimination',this.elimination)
  },error=>{console.log('erorelimin',error)}
  )
}


   
  getmatiere(){
    this.EnseignantService.getMatiere().subscribe(
      res => 
        {
          this.listematiere=res.matiere;
          console.log("filiere", this.listematiere[0]._id)
        }
      ,
      error=>{console.log('error',error)}
    )
    }
  
    getfilere(){
      this.EnseignantService.getFiliere().subscribe(
        res =>
          {
            this.listefiliere=res.filiere;
            console.log("filiere", this.listefiliere[0]._id)
          }
       ,error=>{console.log('error',error)} 
      )
    
    
    }
  
    onfilChange() {
      this.filiereselected= this.filterForm.get('filiere').value;
      console.log('filiereee', this.filiereselected._id);
    }
    onmatChange() {
      this.matiereselected= this.filterForm.get('matiere').value;
      console.log('matiere', this.matiereselected._id);
    }
    delete(etud){
      if(confirm('Êtes-vous sûr de vouloir supprimer cet etudiant ?'))
      { this.EtudiantService.deleteetudiant(etud).subscribe(
          res => { this.ngOnInit();
            console.log('deletee')},
          error => {console.log ('error delete',error)}
        )
      }
      this.ngOnInit();
      this.toster.error("Supprimé", "avec success");
    }
    
}


    


