import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MeetUP, User } from 'src/app/public/interfaces/interfaces';
import { AccesibilityService } from 'src/app/shared/services/accesibility.service';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-show-meet-ups',
  templateUrl: './show-meet-ups.component.html',
  styleUrls: ['./show-meet-ups.component.css']
})
export class ShowMeetUpsComponent implements OnDestroy, OnInit  {

  meetUps:MeetUP[]=[];
  userAttendace:MeetUP[]=[];
  userNotAttendace:MeetUP[]=[];
  choice!:String;

  user: User = JSON.parse(<string>localStorage.getItem('user'));

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  listaCargada:boolean=false;

  dyslexia: boolean = false;
  cursor: boolean = false;
  spacing: boolean = false;

  constructor(private userService: UserService, private accesibilityService: AccesibilityService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ordering: true,
      responsive: true

    };

    this.listaCargada=true;
    this.cargarMeetUps();


    this.accesibilityService.searchChangesBoolean().subscribe((opcion) =>{
      this.dyslexia = opcion;
    })
    this.accesibilityService.searchChangesCursor().subscribe((opcion) =>{
      this.cursor = opcion;
    })
    this.accesibilityService.searchChangesSpacing().subscribe(option => {
      this.spacing = option;
    })

    this.getAllMeetUpsUserAttendance();
    this.getAllMeetUpsUserNotAttendance();

  }

    /**
   * Recupera todos los meet ups disponibles
   */
     cargarMeetUps(){
      this.userService.buscarMeetUps().subscribe({
        next: (resp) => {
          this.meetUps = resp;
          this.dtTrigger.next(null);
          console.log(resp);
        },
        error: (e) => {
          Swal.fire({
            title:'Error',
            icon: 'error',
            text:'There are no services available at this time',
            confirmButtonColor:'#52ab98'
          });
        }
      }
    )
    }

     /**
   * Recupera todos los meet ups disponibles
   */
      getAllMeetUpsUserAttendance(){
        this.userService.getAllMeetUpsUserAttendance().subscribe({
          next: (resp) => {
            this.userAttendace = resp;
            this.dtTrigger.next(null);
            console.log("QUE ASISTEAL MEET UP" );
            console.log(this.userAttendace);
          },
          error: (e) => {
            Swal.fire({
              title:'Error',
              icon: 'error',
              text:'There are no services available at this time',
              confirmButtonColor:'#52ab98'
            });
          }
        }
      )
      }

       /**
   * Recupera todos los meet ups disponibles
   */
        getAllMeetUpsUserNotAttendance(){
      this.userService.getAllMeetUpsUserNotAttendance().subscribe({
        next: (resp) => {
          this.userNotAttendace=resp;
          this.dtTrigger.next(null);
          console.log("QUE NO ASISTE AL MEET UP");
          console.log(resp);
        },
        error: (e) => {
          Swal.fire({
            title:'Error',
            icon: 'error',
            text:'There are no services available at this time',
            confirmButtonColor:'#52ab98'
          });
        }
      }
    )
    }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  asistenciaMeetUp( id:number){
      this.userService.asistenciaMeetUp(id).subscribe({
        next: (resp) => {
          this.cargarMeetUps();
          this.getAllMeetUpsUserAttendance();
          this.dtTrigger.next(null);
          console.log(resp);
        },
        error: (e) => {
          Swal.fire({
            title:'Error',
            icon: 'error',
            text:e.error.mensaje,
            confirmButtonColor:'#52ab98'
          });
        }
      }
    )
  }


  noAsistenciaMeetUp(id:number){
    this.userService.noAsistenciaMeetUp(id).subscribe({
      next: (resp) => {
        this.cargarMeetUps();
        this.getAllMeetUpsUserNotAttendance();
        this.dtTrigger.next(null);
        console.log(resp);
      },
      error: (e) => {
        Swal.fire({
          title:'Error',
          icon: 'error',
          text:e.error.mensaje,
          confirmButtonColor:'#52ab98'
        });
      }
    }
  )
}

}
