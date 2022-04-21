import { Component, OnInit } from '@angular/core';
import { MeetUP } from 'src/app/public/interfaces/interfaces';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-meet-ups',
  templateUrl: './meet-ups.component.html',
  styleUrls: ['./meet-ups.component.css']
})
export class MeetUpsComponent implements OnInit {

  meetUps:MeetUP[]=[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.cargarMeetUps();
  }

  /**
   * Recupera todos los meet ups disponibles
   */
  cargarMeetUps(){
    this.userService.buscarMeetUps().subscribe({
      next: (resp) => {
        this.meetUps = resp;
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
