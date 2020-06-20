import { Component, OnInit } from '@angular/core';
import { EnseignantService } from './../services/enseignant.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
@Component({
  selector: 'app-listeseance',
  templateUrl: './listeseance.component.html',
  styleUrls: ['./listeseance.component.css']
})
export class ListeseanceComponent implements OnInit {

  searchterm;
  listSeance:any=[];
  matiere_list: any = [];
  filiere_list: any = [];
  salle_list : any =[];

  constructor(private ensService: EnseignantService, public toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    console.log("Hello List");
    this.getListPresence("");

  }

  Redirect(id){
    this.router.navigate(['/enseignant/seance/'+id]);
  }

  getListPresence(idens:string):void{
    this.getMatiere();
    this.getFiliere();
    this.getSalle();
    this.ensService.ListeSeance("5ecee9cb4389d42690da3ed4").subscribe(result => {
      console.log("List:"+result);
      for (let res of result.seance)
      {
          for(let m of this.matiere_list)
          {

            if(m._id.toString() == res.id_matiere.toString())
            {

              res.id_matiere = m.libelle;
              break;
            }
          }
          for(let f of this.filiere_list)
          {
            if(f._id.toString() == res.id_filiere.toString())
            {
              res.id_filiere = f.libelle;
              break;
            }
          }

          for(let s of this.salle_list)
          {
            if(s._id.toString() == res.id_salle.toString())
            {
              res.id_salle = s.libelle;
              break;
            }
          }
          this.listSeance.push(res);
      }
      console.log(this.listSeance);
    },err=>{
      console.log('err:' + err);
    })
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

  getSalle(): void{
    this.ensService.getSalle().subscribe(result => {
      for (let mat of result.salle)
      {

        this.salle_list.push(mat);
      }

      console.log("Salle:"+this.salle_list);

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


}
