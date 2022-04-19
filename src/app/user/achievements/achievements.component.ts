import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { Achievement } from '../../public/interfaces/interfaces';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css'],
})
export class AchievementsComponent implements OnInit {
  logros: Achievement[] = [];
  ruta: string = "../../../assets/logros/";

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.cargarLogros();
  }

  cargarLogros() {
    this.userService.buscarLogros().subscribe({
      next: (resp) => {
        this.logros = resp;
        console.log(resp);
      },
      error: (e) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'There are no services available at this time',
          confirmButtonColor: '##52ab98',
        });
      },
    });
  }
}
