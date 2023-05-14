import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorsService } from 'src/app/services/firebase-errors.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {
  recuperarUsuario: FormGroup;
  loading: boolean = false



  constructor ( private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseErrors: FirebaseErrorsService) {

        this.recuperarUsuario = this.fb.group({
          correo: ['', [Validators.required, Validators.email]]
        })
  }

  ngOnInit(): void {
    
  }

  recuperar () {
    const email = this.recuperarUsuario.value.correo; 
    this.loading = true;
    this.afAuth.sendPasswordResetEmail(email).then(() => {

      this.toastr.info('Se te ha enviado mensaje a tu correo para reestablecer tu contraseña', 'Recuperar Contraseña')
      this.router.navigate(['/login'])

    }).catch((error) => {
      this.loading = false;
      this.toastr.error(this.firebaseErrors.codeError(error.code), 'ERROR')
    })
  }


}
