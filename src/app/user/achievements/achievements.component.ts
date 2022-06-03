import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { Achievement, User } from '../../public/interfaces/interfaces';
import { AccesibilityService } from 'src/app/shared/services/accesibility.service';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css'],
})
export class AchievementsComponent implements OnInit {
  logros: Achievement[] = [];
  ruta: string = '../../../assets/logros/';
  user: User = JSON.parse(<string>localStorage.getItem('user'));
  blur: boolean = false;
  dyslexia: boolean = false;
  cursor: boolean = false;
  spacing: boolean = false;
  constructor(private userService: UserService,private accesibilityService: AccesibilityService) {}

  ngOnInit(): void {
    this.cargarLogros();
    this.accesibilityService.searchChangesBoolean().subscribe((opcion) =>{
      this.dyslexia = opcion;
    })
    this.accesibilityService.searchChangesCursor().subscribe((opcion) =>{
      this.cursor = opcion;
    })
    this.accesibilityService.searchChangesSpacing().subscribe(option => {
      this.spacing = option;
    })
  }

  /**
   * Muestra los logros que existen en la base de datos
   */
  cargarLogros() {
    this.userService.buscarLogros().subscribe({
      next: (resp) => {
        this.logros = resp;
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

  /**
   * Set the percentage of progress for every achievement.
   * @param objective
   * @param type
   * @returns percentage to show
   */
  cargaPorcentaje(objective: number, type: string) {
    let percentage: number;
    if (type == 'days') {
      percentage = (100 * this.user.totalTimeWithoutSmoking) / objective;
    } else if (type == 'daysInARow') {
      percentage = (100 * this.user.daysInARowWithoutSmoking) / objective;
    } else if (type == 'cigarettes') {
      percentage = (100 * this.user.cigarettesAvoided) / objective;
    } else {
      percentage = (100 * this.user.moneySaved) / objective;
    }
    this.blur = percentage >= 100 ? false : true;
    return percentage.toString();
  }
}

