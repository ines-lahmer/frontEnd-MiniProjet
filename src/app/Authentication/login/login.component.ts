import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  errorMessage:string;
  constructor(private authService:AuthService,private router:Router,private toastr:ToastrService) {
    if(this.authService.currentUserValue)
    {
      if(this.authService.currentUserValue.role == "ROLE_ADMIN")
      {
        this.router.navigate(['/']);
      }
      else
      {
        this.router.navigate(['/enseignant']);
      }

    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required])
    });
  }
  login()
  {
    console.log("Hello");
    const Data ={
      email : this.email,
      password: this.password
    };
    this.authService.Login(Data).subscribe(result =>{
      if(this.authService.currentUserValue !== null){
        this.errorMessage = '';
        if(this.authService.currentUserValue.role === 'ROLE_ENSEIGNANT'){
          this.router.navigate(['/enseignant']);
        } else if(this.authService.currentUserValue.role ==='ROLE_ADMIN') {
          this.router.navigate(['/etudiant']);
        }
    } else {
      this.errorMessage = 'Check your Coordinates';
      this.toastr.error( this.errorMessage,'Register Operation',{
        timeOut:3000,
        progressBar:true
      });
    }

    },
    err => {
      console.log('err:' + err);
      this.errorMessage = 'Check your email & password';
      this.toastr.error( this.errorMessage,'Register Operation',{
        timeOut:3000,
        progressBar:true
      });
    });


  }

  get email()
  {
    return this.loginForm.value.email;
  }
  get password()
  {
    return this.loginForm.value.password;
  }

}
