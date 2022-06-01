import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ValidatorService } from 'src/app/auth/services/validator.service';
import { AccesibilityService } from 'src/app/shared/services/accesibility.service';
import Swal from 'sweetalert2';
import { Message } from '../interfaces/interfaces';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private validatorService: ValidatorService,
    private authService: AuthService,
    private accesibilityService: AccesibilityService
  ) {}

  dyslexia: boolean = false;

    correcto: boolean = false;

  ngOnInit(): void {
    this.miFormulario.reset({
      fromUser: '',
      text: '',
      subject:''

    });
    this.accesibilityService.searchChanges().subscribe((text) => {
      if (text == 'dyslexia') {
        this.dyslexia = this.dyslexia ? false : true;
      }
    });
  }

  miFormulario: FormGroup = this.fb.group({
    fromUser: [
      ,
      [
        Validators.required,
        Validators.pattern(this.validatorService.emailPattern),
      ]
    ],
    text: [
      ,
      [
        Validators.required
      ]
    ],
    subject:[]
    });


    /**
     * Envia todos los datos introducidos para enviar un email
     */
    submitFormulario(){
      let mensaje: Message = this.miFormulario.value;

      this.authService.newMensaje(mensaje).subscribe({
        next: resp => {
          Swal.fire(
            {
              title:'Success',
              icon: 'success',
              text:'Your message was successfully sent',
              confirmButtonColor:'##52ab98'
            });
        },
        error: err => {
          Swal.fire(
            {
              title:'Error',
              icon: 'error',
              text:err.error.message,
              confirmButtonColor:'##52ab98'
            });
        }
      })
      this.miFormulario.reset();
    }

    campoNoValido(campo: string){
      return (
        this.miFormulario.get(campo)?.invalid &&
        this.miFormulario.get(campo)?.touched
      );
    }


    get error(): string{
      const errors = this.miFormulario.get('name')?.errors!
      if(errors['required']){
        return 'Field required';
      }
      return '';
    }

    get mssgError(): string{
      const errors = this.miFormulario.get('mssg')?.errors!
      if(errors['required']){
        return 'Field required';
      }
      return '';
    }





}
