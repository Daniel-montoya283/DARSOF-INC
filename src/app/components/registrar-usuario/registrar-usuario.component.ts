import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseErrorsService } from 'src/app/services/firebase-errors.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css'],
})
export class RegistrarUsuarioComponent implements OnInit {
  registrarUsuario: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseErrors: FirebaseErrorsService
  ) {
    this.registrarUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  //aqui el ususario da clic y la imformacion de los campos de almacena
  registrar() {
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassowrd = this.registrarUsuario.value.repetirPassword;

    //validacion contraseñas
    if (password !== repetirPassowrd) {
      this.toastr.error('las contraseñas no coinciden', 'Error');
      return;
    }

    this.loading = true;

    //cuando la validacion fue exitosa y lo redirige al login

    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
  

        this.VerificarCorreoC();

        //importacion del error:
      })
      .catch((error) => {
        this.loading = false;
        this.toastr.error(this.firebaseErrors.codeError(error.code), 'Error');
      });
  }

  VerificarCorreoC() {
    this.afAuth.currentUser
      .then((user) => user?.sendEmailVerification())
      .then(() => {
        this.toastr.info(
          'Te hemos enviado un correo electronico para su verificacion',
          'Verificar correo'
        );
        this.router.navigate(['/login']);
      });
  }
}
