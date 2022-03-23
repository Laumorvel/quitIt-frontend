import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user';
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

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.updateUserDAta();
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
          confirmButtonColor:'#be8f8c'
        });
      }
   });
  }




}

