import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const URL= "http://localhost:8080/";
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  RegisterUser(data: object): Observable<any>
  {
    return this.http.post(URL + 'api/register', data, httpOptions);
  }

  Login(data: object): Observable<any>
  {
    return this.http.post(URL + 'api/login', data, httpOptions).pipe(map(couser=>{
      let user = JSON.parse(JSON.stringify(couser));
      if(user.user != null)
      {
        localStorage.setItem('currentUser', JSON.stringify(user.user));
        this.currentUserSubject.next(user.user);
      }
      return user;
    }));
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

  loginAuthGuard()
  {
    if(((localStorage.getItem('currentUser'))) != null) {
      return true;
    }
    else
    {
      return false;
    }
  }

  getLoginToken(){
    if((localStorage.getItem('currentUser')) != null) {
        const user= JSON.parse(localStorage.getItem('currentUser'));
        return user.token;

    }
    else
    {
      return null;
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}
}
interface User{
  id:string;
  fullname:string;
  email:string;
  role:string;
  token:string;
}
