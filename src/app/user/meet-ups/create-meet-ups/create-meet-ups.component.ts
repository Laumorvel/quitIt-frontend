import { Component, OnInit } from '@angular/core';
import { AccesibilityService } from 'src/app/shared/services/accesibility.service';
import Swal from 'sweetalert2';
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
  dyslexia: boolean = false;
  cursor: boolean = false;
  spacing: boolean = false;

  constructor(private userService: UserService, private accesibilityService: AccesibilityService) { }

  ngOnInit(): void {
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
