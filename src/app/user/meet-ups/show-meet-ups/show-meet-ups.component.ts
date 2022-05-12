import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MeetUP } from 'src/app/public/interfaces/interfaces';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-show-meet-ups',
  templateUrl: './show-meet-ups.component.html',
  styleUrls: ['./show-meet-ups.component.css']
})
export class ShowMeetUpsComponent implements OnDestroy, OnInit  {

  meetUps:MeetUP[]=[];
  choice!:String;

  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ordering: true
      
    };


    this.cargarMeetUps();
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

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  asistenciaMeetUp( id:number){
      this.userService.asistenciaMeetUp(id).subscribe({
        next: (resp) => {
          this.cargarMeetUps();
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


  noAsistenciaMeetUp(id:number){
    this.userService.noAsistenciaMeetUp(id).subscribe({
      next: (resp) => {
        this.cargarMeetUps();
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

}
