import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {EtudiantService} from '../services/etudiant.service'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Etudiant } from '../classes/etudiant';
import { EnseignantService } from '../services/enseignant.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
  filiereselected;
  etudiant: Etudiant[];
  idetud;
  etudiantedit:Etudiant;
  listeMatiere:any=[];
  listefilere:any=[];
searchterm;
//selectedfiliere="5ea2e4cb1a92ae1d98f9e12b";
addetudiantForm:FormGroup;
editetudiantForm:FormGroup;
  constructor(private route: ActivatedRoute, private router: Router,
    private EtudiantService: EtudiantService, private EnseignantService: EnseignantService,
    private fb: FormBuilder , private toaster : ToastrService
  ) { }

  ngOnInit(): void {
  this.addetudiantForm = new FormGroup(
    { name:new FormControl('' , [Validators.required]),
      prenom:new FormControl('' , [Validators.required]),
      rfid:new FormControl('' , [Validators.required,Validators.maxLength(8)]),
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
      email: ['',[Validators.required],],
      tel: ['',[Validators.required]],
      cin: ['',[Validators.required]],
      date: ['',[Validators.required]],
      filiere: ['',[Validators.required]],

    }
  )
 

    this.getfilere();
    
    this.getmatiere();
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
  this.ngOnInit();
  this.toaster.error("Supprimé", "avec success");
}
}

onfileditChange(){
 this.filiereselected= this.editetudiantForm.get('filiere').value;
}

ajoutetudiant(){
  let etud= new Etudiant();
  etud.nom= this.addetudiantForm.get('name').value;
  etud.prenom=this.addetudiantForm.get('prenom').value;
  etud.cin=this.addetudiantForm.get('cin').value;
  etud.tel=this.addetudiantForm.get('tel').value;
  etud.rfid =this.addetudiantForm.get('rfid').value;
  etud.email=this.addetudiantForm.get('email').value;
  etud.id_filiere=this.filiereselected._id;
 
  etud.date_naiss=this.addetudiantForm.get('date').value;
this.EtudiantService.addetudiant(etud).subscribe(
  res => { console.log('add',etud);
  this.ngOnInit()
  this.toaster.success("Ajout", "avec success");
  },error =>{ console.log('error',error)}
)



}

openmodal(etud,id){
  console.log("Filiere:"+this.filiereselected);
  this.idetud=id;
  console.log('formedit', this.idetud)
  console.log('ETUD'+JSON.stringify(etud));
  this.editetudiantForm.patchValue({
    name:etud.nom,
    prenom:etud.prenom,
    cin:etud.cin,
    rfid:etud.rfid,
    date:etud.date_naiss,
    tel:etud.tel,
    email:etud.email,
    filiere:etud.id_filiere
    
  });
  this.editetudiantForm.get('filiere').setValue(etud.id_filiere);
 
}

editetudiant(){
  let Data={
    nom:this.nom,
    prenom:this.prenom,
    date_naiss:this.date,
    rfid:this.rfid,
    tel:this.tel,
    cin:this.cin,
    email:this.email,
    id_filiere:this.filiereselected._id


  }
  this.EtudiantService.updateetudiant(this.idetud,Data).subscribe(
    res => { console.log('apdate', Data)
      },
    error => {console.log('error edit',error)}
  )
  this.ngOnInit();
 
  this.toaster.success( "'success", 'Update avec succés', {
    timeOut: 3000,
   progressBar: true
   });
      
     
}

getmatiere(){
  console.log('matiere1');
  this.EnseignantService.getMatiere().subscribe(
    res =>{ 
      console.log("matiere2");
      for (let mat of res.matiere)
      {
        this.listeMatiere.push(mat);
        console.log("filiere", this.listeMatiere[0]._id)
      }
    },
    error=>{console.log('error',error)}
  )
  }

  getfilere(){
    this.EnseignantService.getFiliere().subscribe(
     res =>
     {
        this.listefilere=res.filiere;
        } 
      
    ,error=>{console.log('errorfil',error)}
    )
    }

    onfiliereChange() {
      this.filiereselected= this.addetudiantForm.get('filiere').value;
      console.log('filiereee', this.filiereselected._id);
    }

    get nom(){
      return this.editetudiantForm.value.name;
    }
    get prenom(){
      return this.editetudiantForm.value.prenom;
    }
    
    get date(){
      return this.editetudiantForm.value.date;
    }
    
    get rfid(){
      return this.editetudiantForm.value.rfid;
    }
    
    get tel(){
      return this.editetudiantForm.value.tel;
    }
    
    get email(){
      return this.editetudiantForm.value.email;
    }
    
    get cin(){
      return this.editetudiantForm.value.cin;
    }
    
    

}
