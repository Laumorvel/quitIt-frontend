import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/public/interfaces/interfaces';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
})
export class ClockComponent implements OnInit {
  user: User = JSON.parse(<string>localStorage.getItem('user'));
  cigarettes: number = 0;
  msg: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.updateUserDAta();
  }

  updateUserDAta() {
    this.userService.updateUser().subscribe({
      next: (resp) => {
        this.user = resp;
        localStorage.setItem('user', JSON.stringify(resp));
      },
      error: (resp) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: resp.error.mensaje,
          confirmButtonColor: '#52ab98',
        });
      },
    });
  }

  userSmoked() {
    this.userService.userSmoked(this.cigarettes, this.user).subscribe({
      next: resp => {
        this.user = resp;
        localStorage.setItem('user', JSON.stringify(resp));
      },
      error: (resp) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: resp.error.mensaje,
          confirmButtonColor: '#52ab98',
        });
      },
    });
  }

  // calcularDineroAhorrado(){
  //   this.dineroAhorrado=this.user.moneyPerDay * this.user.daysInARowWithoutSmoking
  //   console.log(this.dineroAhorrado)
  // }

  // calcularCigarrosNoFumados(){
  //   this.cigarrosNoFumados=this.user.daysInARowWithoutSmoking*this.user.cigarettesAvoided
  // }
}
