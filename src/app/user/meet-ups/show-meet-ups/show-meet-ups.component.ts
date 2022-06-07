import { Component, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { MeetUP, User } from 'src/app/public/interfaces/interfaces';
import { AccesibilityService } from 'src/app/shared/services/accesibility.service';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-show-meet-ups',
  templateUrl: './show-meet-ups.component.html',
  styleUrls: ['./show-meet-ups.component.css'],
})
export class ShowMeetUpsComponent implements  OnInit {
  meetUps: MeetUP[] = [];
  userAttendace: MeetUP[] = [];
  userNotAttendace: MeetUP[] = [];
  choice!: String;

  carga:boolean=false;

  user: User = JSON.parse(<string>localStorage.getItem('user'));

  scrollableTabs: any[] = Array.from({ length: 50 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Tab ${i + 1} Content` }));

  dyslexia: boolean = false;
  cursor: boolean = false;
  spacing: boolean = false;

  //Variable necesarias para no crear un bucle infinito
  //al actualizar las listas
  clickNo:boolean = false;
  clickYes:boolean = false;

  constructor(
    private userService: UserService,
    private accesibilityService: AccesibilityService
  ) {}

  ngOnInit(): void {


    this.accesibilityService.searchChangesBoolean().subscribe((opcion) => {
      this.dyslexia = opcion;
    });
    this.accesibilityService.searchChangesCursor().subscribe((opcion) => {
      this.cursor = opcion;
    });
    this.accesibilityService.searchChangesSpacing().subscribe((option) => {
      this.spacing = option;
    });

    this.cargarMeetUps();

    this.getAllMeetUpsUserAttendance();
    this.getAllMeetUpsUserNotAttendance();
  }

  /**
   * Recupera todos los meet ups disponibles
   */
  cargarMeetUps() {
    this.userService.buscarMeetUps().subscribe({
      next: (resp) => {
        this.meetUps = resp;
       this.carga=true;
      },
      error: (e) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'There are no services available at this time',
          confirmButtonColor: '#52ab98',
        });
      },
    });
  }

  /**
   * Recupera todos los meet ups a los que el usurio asiste
   */
  getAllMeetUpsUserAttendance() {
    
    this.userService.getAllMeetUpsUserAttendance().subscribe({
      next: (resp) => {
        this.userAttendace = resp;
        this.getAllMeetUpsUserNotAttendance();
        this.callMeetUpsNonAttendance();
       
      },
      error: (e) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'There are no services available at this time',
          confirmButtonColor: '#52ab98',
        });
      },
    });
  }

  callMeetUpsAttendance(){
    this.userService.getAllMeetUpsUserAttendance().subscribe({
      next: (resp) => {
        this.userAttendace = resp;
       
      },
      error: (e) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'There are no services available at this time',
          confirmButtonColor: '#52ab98',
        });
      },
    });
  }

  callMeetUpsNonAttendance(){
    this.userService.getAllMeetUpsUserNotAttendance().subscribe({
      next: (resp) => {
        this.userNotAttendace = resp;
       
      },
      error: (e) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'There are no services available at this time',
          confirmButtonColor: '#52ab98',
        });
      },
    });
  }

  /**
   * Recupera todos los meet ups a los que el usuario no asiste
   */
  getAllMeetUpsUserNotAttendance() {
    this.userService.getAllMeetUpsUserNotAttendance().subscribe({
      next: (resp) => {
        this.userNotAttendace = resp;
        this.callMeetUpsAttendance();
       
      },
      error: (e) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'There are no services available at this time',
          confirmButtonColor: '#52ab98',
        });
      },
    });
  }

  asistenciaMeetUp(id: number) {
    this.userService.asistenciaMeetUp(id).subscribe({
      next: (resp) => {
        this.cargarMeetUps();
        this.getAllMeetUpsUserAttendance();
       
      },
      error: (e) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'You have already confirmed your attendance',
          confirmButtonColor: '#52ab98',
        });
      },
    });
  }

  noAsistenciaMeetUp(id: number) {
    this.userService.noAsistenciaMeetUp(id).subscribe({
      next: (resp) => {
        this.cargarMeetUps();
        this.getAllMeetUpsUserNotAttendance();
       
      },
      error: (e) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'You have already cancelled your attendance',
          confirmButtonColor: '#52ab98',
        });
      },
    });
  }




  applyFilterGlobal($event: any, stringVal: any,  dt: any) {
    dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }






}
