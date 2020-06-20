import { ActivatedRoute } from '@angular/router';
import { EnseignantService } from './../services/enseignant.service';
import { Enseignant } from './../classes/enseignant';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.css']
})
export class EnseignantComponent implements OnInit {




  matiere_list: any = [];
  filiere_list: any = [];
  idsession: string = "";
  etud_id: string = "";
  op_result: string = "";

  //
  searchterm;
  enseignant: Enseignant[];
  listEtd:any=[];

  constructor(private ensService: EnseignantService, public toastr: ToastrService,private router :ActivatedRoute) { }

  ngOnInit(): void {
    this.getMatiere();
    console.log("here");
    this.getListPresence();


  }

  getListPresence():void{
    const idSeance = this.router.snapshot.paramMap.get('idSeance');
    this.ensService.ListePresence(idSeance).subscribe(result => {
      console.log("Your Result :"+result.ListPres);
      for(let res of result.ListPres)
      {
          this.listEtd.push(res);
      }
      console.log(this.listEtd);
    }, err =>{
      console.log('err:'+ err);
    });
  }

  getMatiere(): void{
    this.ensService.getMatiere().subscribe(result => {
      for (let mat of result.matiere)
      {
        this.matiere_list.push(mat);
      }

      console.log(this.matiere_list);

    },
    err => {
      console.log('error:' + err);
    });
  }

  getFiliere(): void{
    this.ensService.getFiliere().subscribe(result => {
      for (let fil of result.filiere)
      {
        this.filiere_list.push(fil);
      }

      console.log(this.filiere_list);

    },
    err => {
      console.log('error:' + err);
    });
  }

  UpdateEtudiant(etd_id:string){
    let idSeance = this.router.snapshot.paramMap.get('idSeance');
    this.ensService.UpdateEtudiant(idSeance,etd_id).subscribe(upd => {
      this.op_result = upd.message;
      if (upd.error === false)
      {
        this.toastr.success( this.op_result, 'Update Operation', {
          timeOut: 3000,
          progressBar: true
        });
      }
      else
      {
        this.toastr.error( this.op_result, 'Update User Operation', {
          timeOut: 3000,
          progressBar: true
        });
      }
    });
  }


}
