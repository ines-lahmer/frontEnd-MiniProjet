
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class EnseignantService {

  private BASE_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  ListePresence(idseance: string): Observable<any>{
    return this.http.get(this.BASE_URL + `/api/enseignant/${idseance}/presence`);
  }

  ListeSeance(idens: string):Observable<any>{
    return this.http.get(this.BASE_URL + `/api/enseignant/${idens}/seance`);
  }
  getSalle():Observable<any>{
    return this.http.get(this.BASE_URL + '/api/enseignant/salle');

  }

  getMatiere(): Observable<any>{
    return this.http.get(this.BASE_URL + '/api/enseignant/matiere');
  }

  getFiliere(): Observable<any>{
    return this.http.get(this.BASE_URL + '/api/enseignant/filiere');
  }

  UpdateEtudiant(idsession: string, idetud: string): Observable<any>{
    let Data ={
      id_seance:idsession
    };
    return this.http.post(this.BASE_URL + `/api/enseignant/${idetud}/upd`, Data, httpOptions);
  }

  getStatistics(): Observable<any>{
    return this.http.get(this.BASE_URL + '/api/enseignant/statis');
  }
}
