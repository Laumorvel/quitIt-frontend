import { Component, OnInit } from '@angular/core';
import { User } from '../../../public/interfaces/interfaces';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exsmoker-data',
  templateUrl: './exsmoker-data.component.html',
  styleUrls: ['./exsmoker-data.component.css']
})
export class ExsmokerDataComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  user: User = JSON.parse(<string>localStorage.getItem('user'));
  modificando:boolean = false;

  getUserData() {
    this.userService.updateUser().subscribe({
      next: (resp) => {
        this.user = resp;
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
}
