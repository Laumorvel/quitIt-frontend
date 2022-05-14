import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-meet-ups',
  templateUrl: './create-meet-ups.component.html',
  styleUrls: ['./create-meet-ups.component.css']
})
export class CreateMeetUpsComponent implements OnInit {

  title !: string;
  description !: string
  date !: string;
  type !: string;
  place !: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  guardarType(tipo:string){
    this.type=tipo;
  }



  creeateMeetUp(){
    this.userService.createMeetUp(this.title, this.description, this.date, this.type, this.place)
    .subscribe({
      next: (resp => {
        Swal.fire({
          title:'Success',
          icon: 'success',
          text:"The meet up has been created successfully",
          confirmButtonColor:'#52ab98'
        });
     }),
      error: resp => {
        console.log(resp.message);
        Swal.fire({
          title:'Error',
          icon: 'error',
          text:resp.error.mensaje,
          confirmButtonColor:'#52ab98'
        });
      }
   });
}



}
