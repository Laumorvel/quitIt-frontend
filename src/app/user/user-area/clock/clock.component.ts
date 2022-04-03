import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/public/interfaces/interfaces';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {


  user: User = JSON.parse(<string>localStorage.getItem('user'));
  diasSinFumar!:number;
  dineroAhorrado!:number;
  cigarrosNoFumados!:number;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.updateUserDAta();
    this.calcularDineroAhorrado();
    this.calcularCigarrosNoFumados();
  }

 updateUserDAta(){
   this.userService.updateUser()
    .subscribe({
      next: (resp => {
        //this.user=resp;

        localStorage.setItem('user', JSON.stringify(resp));
        console.log(this.user)
     }),
      error: resp => {
        Swal.fire({
          title:'Error',
          icon: 'error',
          text:resp.error.mensaje,
          confirmButtonColor:'#52ab98'
        });
      }
   });
  }


  calcularDineroAhorrado(){
    this.dineroAhorrado=this.user.moneyPerDay * this.user.daysInARowWithoutSmoking
    console.log(this.dineroAhorrado)
  }

  calcularCigarrosNoFumados(){
    this.cigarrosNoFumados=this.user.daysInARowWithoutSmoking*this.user.cigarettesAvoided
  }


}

