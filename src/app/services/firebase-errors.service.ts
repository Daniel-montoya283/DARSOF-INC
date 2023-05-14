import { Injectable } from '@angular/core';
import { FirebaseErrorsEnum } from '../utils/firebaseErrors';

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorsService {

  constructor() { }


  codeError(code: string) {
    switch (code) {
      //correo ya existe
      case FirebaseErrorsEnum.EmailAlreadyInUser:
      return 'El usuario ya existe'
      //contraseña debil 
      case FirebaseErrorsEnum.WeakPassword:
        return 'la contraseña debe de ser de 6 o mas caracteres'
      //correo invalido
      case FirebaseErrorsEnum.InvalidEmail:
        return 'El correo es invalido'
        //contraseña incorrecta
      case FirebaseErrorsEnum.WrongPassword:
        return 'El usuario o la contraseña son incorrectas'
        //Usuario no existe
      case FirebaseErrorsEnum.UserNotFound:
        return 'El usuario o la contraseña son incorrectas'
        default:
        return 'error desconocido'
    
    }
  }
}
