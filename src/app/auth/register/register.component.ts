import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { emailValidatorService } from '../services/email-validator.service';
import { UsernameValidatorService } from '../services/username-validator.service';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidator: emailValidatorService,
    private usernameValidator: UsernameValidatorService,
    private authService: AuthService,
    private router: Router
  ) {}

  miFormulario: FormGroup = this.fb.group(
    {
      name: [
        ,
        [
          Validators.required,
          Validators.pattern(this.validatorService.namePattern),
        ],
      ],
      lastName: [
        ,
        [
          Validators.required,
          Validators.pattern(this.validatorService.namePattern),
        ],
      ],
      email: [
        ,
        [
          Validators.required,
          Validators.pattern(this.validatorService.emailPattern),
        ],
        [this.emailValidator],
      ],
      username: [, [Validators.required,
      ],
      [this.usernameValidator]
    ],
      password: [, [Validators.required]],
      password2: [, [Validators.required]],
    },
    {
      validators: [
        this.validatorService.camposIguales('password', 'password2')
      ]
    }
  );


  /**
   * mensajes para el error del nombre
   */
    get nameError(): string{
      const errors = this.miFormulario.get('name')?.errors!;
      if(errors['required']){
        return 'Name required';
      }else if(errors['pattern']){
        return 'Numbers are not allowed';
      }
      return '';
    }

    /**
     * mensajes para el error del nombre
     */
    get lastNameError(): string{
      const errors = this.miFormulario.get('lastName')?.errors!;
      if(errors['required']){
        return 'lastName required';
      }else if(errors['pattern']){
        return 'Numbers are not allowed';
      }
      return '';
    }



  /**
   * Mensajes para el error del email
   */
  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors!;
    if (errors['required']) {
      return 'Email required';
    } else if (errors['pattern']) {
      return 'An email was expected';
    } else if (errors['emailIndicado']) {
      return 'This email is already in use';
    }
    return '';
  }


  /**
   * Mensajes para el username
   */
  get usernameError(): string{
    const errors = this.miFormulario.get('username')?.errors!;
    if(errors['required']){
      return 'User required';
    }else if(errors['usernameCogido']){
      return 'This username is already in use';
    }
    return '';
  }


  /**
   * Mensajes para la contraseña
   */
  get passwordError(): string{
    const errors = this.miFormulario.get('password')?.errors!;
    if(errors['required']){
      return 'Password required';
    }
    return '';
  }


  ngOnInit(): void {
    this.miFormulario.reset({
      name: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      password2: ''
    });
  }

  /**
   *
   * @param campo
   * @returns Comprueba si la información introducida en un campo es valida
   */
  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }


  /**
   * Registra el usuario en la base de datos
   * @param objetivos
   */
  submitFormulario(objetivos :number[]) {
    const user = this.miFormulario.value

    user.cigarettesBeforePerDay = objetivos[0];
    user.moneyPerDay = objetivos[1];

   this.authService.register(user)
    .subscribe({
      next: (resp => {
        /**
 * RESETEAMOS LAS VARIABLES PARA CUANDO HAYA UN NUEVO REGISTRO NO PUEDAN DARNOS PROBLEMAS
 */
        this.miFormulario.reset({
          name: '',
          lastName:'',
          email: '',
          username: '',
          password: '',
          condiciones: false
        })

        this.router.navigateByUrl(`/login`);
     }),
      error: resp => {
        Swal.fire({
          title:'Error',
          icon: 'error',
          text:resp.error.mensaje,
          confirmButtonColor:'##52ab98'
        });
      }
   });
  }

}
