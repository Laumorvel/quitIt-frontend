import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { ValidatorService } from '../../services/validator.service';
import { PasswordValidatorService } from '../../services/password-validator.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private passwordValidatorService: PasswordValidatorService,
    private userService: UserService,
    private router: Router
  ) {}


  miFormulario: FormGroup = this.fb.group(
    {
      password: [,[Validators.required],
        [this.passwordValidatorService],
      ],
      password2: [, [Validators.required]],
      password3: [, [Validators.required]],
    },
    {
      validators: [
        this.validatorService.camposIguales('password', 'password2')
      ]
    }
  );

  get actuallypasswordError(): string{
    const errors = this.miFormulario.get('password')?.errors!;
    if(errors['required']){
      return 'Password required';
    }
     if(errors['passwordCogido']){
      console.log("COGIDO")
      return 'This password is correct';
    }
    else {
      console.log("ERROR")
    return 'This password is incorrect';
  }

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
        password: '',
        password2: '',
        password3: ''
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
     this.userService.changePass(user)
      .subscribe({
        next: (resp => {
          /**
   * RESETEAMOS LAS VARIABLES PARA CUANDO HAYA UN NUEVO REGISTRO NO PUEDAN DARNOS PROBLEMAS
   */
          this.miFormulario.reset({
            password: '',
            password2: '',
            password3: '',
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
