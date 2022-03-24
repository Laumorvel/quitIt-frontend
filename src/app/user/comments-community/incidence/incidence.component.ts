import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-incidence',
  templateUrl: './incidence.component.html',
  styleUrls: ['./incidence.component.css']
})
export class IncidenceComponent implements OnInit {


  subject !: string;
  text !: string;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  sendIncidence(){
    this.userService.sendIncidence(this.subject,this.text)
    .subscribe({
      next: (resp => {
        
        Swal.fire('Success', 'Your incidence  was successfully sent', 'success');
       
     }),
      error: resp => {
        console.log(resp.message);
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
