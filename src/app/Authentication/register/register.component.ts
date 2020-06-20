import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

registerForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    date_naiss: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    cin: new FormControl('', [Validators.required]),
    rfid : new FormControl('',[Validators.required])
});

  constructor(private authService: AuthService,private router:Router,private toastr:ToastrService) {
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
  }

  OnClear()
  {

  }

  registerUser()
  {
    console.log("Hello");
    const Data = {
      nom: this.nom,
      prenom: this.prenom,
      tel: this.tel,
      date_naiss: this.date_naiss,
      email: this.email,
      cin: this.cin,
      rfid:this.rfid,
      role: 'ROLE_ENSEIGNANT'
    };

    this.authService.RegisterUser(Data).subscribe(result=>{
      console.log(result);
      if (result.token !== null) {
        this.router.navigate(['/login']).then(()=>{
          this.toastr.success( result.message,'Register Operation',{
            timeOut:3000,
            progressBar:true
          });
        });
      }
      else
      {
        this.toastr.error( "Failed To Proceed your Register",'Add Operation',{
          timeOut:3000,
          progressBar:true
        });
      }
    });
  }

  get nom()
  {
    return this.registerForm.value.nom;
  }
  get prenom()
  {
    return this.registerForm.value.prenom;
  }
  get cin()
  {
    return this.registerForm.value.cin;
  }
  get tel()
  {
    return this.registerForm.value.tel;
  }
  get rfid()
  {
    return this.registerForm.value.rfid;
  }
  get email()
  {
    return this.registerForm.value.email;
  }
  get date_naiss()
  {
    return this.registerForm.value.date_naiss;
  }

}
