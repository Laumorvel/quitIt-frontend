import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email !: string;
  password !: string;

  /**
   * INYECTAMOS EN EL CONSTRUCTOR ROUTER Y AUTHSERVICE
   * @param router
   * @param authService
   */
    constructor(  private router:Router,
                  private authService: AuthService
                  ) { }

    ngOnInit(): void {
    }

    /**
     * Busca que el usuario y contraseña introducidos esten ya registrados. Si existen esos datos nos devovlera un token que guardaremos en el localStorage
     */
    login(){
      this.authService.login(this.email,this.password)
      .subscribe({
        next: (resp => {
          localStorage.setItem('token',JSON.stringify(resp.access_token))
          this.getIdUser();
       }),
        error: resp => {
          console.log(resp.message);
          Swal.fire({
            title:'Error',
            icon: 'error',
            text:resp.error.mensaje,
            confirmButtonColor:'#52ab98'
          });
        }
     });
  }


  /**
   * Comprueba cual es el rol del usuario, y dependiendo de su rol se le redirigira a una ruta u otra
   */
  getIdUser() {
    this.authService.loginGetIdUser().subscribe((resp) => {
      localStorage.setItem('user', JSON.stringify(resp));
      localStorage.setItem('rol',resp.rol)

      if(resp.rol=="USER"){
        this.router.navigateByUrl(`/userArea`);
      }
      else{
        this.router.navigateByUrl(`/administratorDashboard`);
      }

    });
  }

}
