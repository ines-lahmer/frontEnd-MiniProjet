import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Etudiant } from '../classes/etudiant';
import { Observable } from 'rxjs';
//import { threadId } from 'worker_threads';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private BASE_URL= "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getAllEtudiant(){
    return this.http.get<Etudiant[]>(this.BASE_URL+'/api/admin/liststud');
  }

  addetudiant(etudiant:Object): Observable<Object>{
    return this.http.post(this.BASE_URL+'/api/admin/addstud',etudiant)
  }
  deleteetudiant(id){
    return this.http.delete(this.BASE_URL+'/api/admin/deletestud/'+id)
  }
  updateetudiant(id, etudiant): Observable<Object>{
    return this.http.put(this.BASE_URL+'/api/admin/updstud/'+ id,etudiant)
  }

}
