import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorsService } from 'src/app/services/firebase-errors.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  loginUsuario: FormGroup;
  loading: boolean = false; 

  constructor (     private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseErrors: FirebaseErrorsService) {


      //inicializando la variable loginUsuario
      this,this.loginUsuario = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      })
  }

  ngOnInit(): void {
    
  }


  login() {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;

    


    this.loading = true
    
    //pasando por inyeccion de dependencias
    this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
    
      //validacion para pasar al dashboard
      if(user.user?.emailVerified) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/verificar-correo']);
      }

    }).catch((error) => {
      this.loading = false
      this.toastr.error(this.firebaseErrors.codeError(error.code),'ERROR' );
    }
    )
  }
}
