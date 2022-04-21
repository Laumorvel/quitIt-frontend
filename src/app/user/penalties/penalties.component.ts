import { Component, OnInit } from '@angular/core';
import { Penalty } from 'src/app/public/interfaces/interfaces';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-penalties',
  templateUrl: './penalties.component.html',
  styleUrls: ['./penalties.component.css']
})
export class PenaltiesComponent implements OnInit {


  penalizaciones:Penalty[]=[];
  

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.cargarPenalizaciones();
  }

  /**
   * Recupera todas las penalizaciones que existen en la base de datos
   */
  cargarPenalizaciones(){
    this.userService.buscarPenalizaciones().subscribe({
      next: (resp) => {
        this.penalizaciones = resp;
        console.log(resp);
      },
      error: (e) => {
        Swal.fire({
          title:'Error',
          icon: 'error',
          text:'There are no services available at this time',
          confirmButtonColor:'##52ab98'
        });
      }
    }
  )
  }

}
