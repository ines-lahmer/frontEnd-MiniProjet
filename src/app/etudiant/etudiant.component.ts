import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {EtudiantService} from '../services/etudiant.service'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Etudiant } from '../classes/etudiant';
@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {

  etudiant: Etudiant[];
  idetud;
  etudiantedit:Etudiant;
searchterm;
selectedfiliere="5ea2e4cb1a92ae1d98f9e12b";
addetudiantForm:FormGroup;
editetudiantForm:FormGroup;
  constructor(private route: ActivatedRoute, private router: Router,
    private EtudiantService: EtudiantService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  this.addetudiantForm = new FormGroup(
    { name:new FormControl('' , [Validators.required]),
      prenom:new FormControl('' , [Validators.required]),
      rfid:new FormControl('' , [Validators.required]),
      email:new FormControl('' , [Validators.required]),
      tel:new FormControl('' , [Validators.required]),
      cin:new FormControl('' , [Validators.required]),
      date:new FormControl('' , [Validators.required]),
      filiere:new FormControl('' , [Validators.required])

    }
  );

  this.editetudiantForm = this.fb.group(
    { name: ['',[Validators.required]],
      prenom: ['',[Validators.required]],
      rfid: ['',[Validators.required]],
      email: ['',[Validators.required]],
      tel: ['',[Validators.required]],
      cin: ['',[Validators.required]],
      date: ['',[Validators.required]],
      filiere: ['',[Validators.required]],

    }
  )
 


    this.listeEtudiant();
  }
  listeEtudiant(){
    return this.EtudiantService.getAllEtudiant().subscribe(
      res => { this.etudiant=res;
        console.log('liste',this.etudiant)
      }, error=>{console.log("error",error)}
    )
  }
delete(id){
  if(confirm('Êtes-vous sûr de vouloir supprimer cet etudiant ?'))
{ this.EtudiantService.deleteetudiant(id).subscribe(
    res => { this.listeEtudiant();
      console.log('deletee')},
    error => {console.log ('error delete',error)}
  )
}
}

onfilChange(){
 // this.selectedfiliere= this.addetudiantForm.get('filiere').value;
}

ajoutetudiant(){
  let etud= new Etudiant();
  etud.nom= this.addetudiantForm.get('name').value;
  etud.prenom=this.addetudiantForm.get('prenom').value;
  etud.cin=this.addetudiantForm.get('cin').value;
  etud.tel=this.addetudiantForm.get('tel').value;
  etud.rfid =this.addetudiantForm.get('rfid').value;
  etud.email=this.addetudiantForm.get('email').value;
  etud.id_filiere=this.selectedfiliere;
 
  etud.date_naiss=this.addetudiantForm.get('date').value;
this.EtudiantService.addetudiant(etud).subscribe(
  res => { console.log('add',etud);
  this.ngOnInit()

  },error =>{ console.log('error',error)}
)



}

openmodal(etud:Etudiant){
  this.editetudiantForm.patchValue({
    name:etud.nom,
    prenom:etud.prenom,
    cin:etud.cin,
    rfid:etud.rfid,
    date_naiss:etud.date_naiss,
    tel:etud.tel,
    email:etud.email,
    filiere:"5ea2e4cb1a92ae1d98f9e12b"
  });
  this.idetud=etud._id;
}

editetudiant(){
  this.etudiantedit=this.editetudiantForm.getRawValue();
  this.EtudiantService.updateetudiant(this.idetud,this.etudiantedit).subscribe(
    res => { console.log('apdate', this.etudiantedit)},
    error => {console.log('error edit',error)}
  )

}

}
