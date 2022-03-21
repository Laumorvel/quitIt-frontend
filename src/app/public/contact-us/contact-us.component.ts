import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ValidatorService } from 'src/app/auth/services/validator.service';
import Swal from 'sweetalert2';
import { Message } from '../interfaces/message';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private validatorService: ValidatorService,
    private authService: AuthService) {}

    correcto: boolean = false;

  ngOnInit(): void {
    this.miFormulario.reset({
      fromUser: '',
      text: '',
      subject:''

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


    //SUBMIT
    submitFormulario(){
      let mensaje: Message = this.miFormulario.value;

      this.authService.newMensaje(mensaje).subscribe({
        next: resp => {
          Swal.fire('Success', 'Your message was successfully sent', 'success');
        },
        error: err => {
          Swal.fire('Error', err.error.message, 'error');
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
