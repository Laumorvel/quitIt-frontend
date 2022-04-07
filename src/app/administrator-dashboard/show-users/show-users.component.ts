import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { User } from '../../public/interfaces/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {


  usuarioEncontrados!:User;
  busqueda!:String;

  usuarioRecibido:boolean=false;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  buscarUser(){
    this.adminService.buscarUsuariosCoincidentes(this.busqueda).subscribe({
      next: (resp) => {
        this.usuarioEncontrados = resp;
        this.usuarioRecibido=true;
        console.log(resp);
      },
      error: (e) => {
        Swal.fire({
          title:'Error',
          icon: 'error',
          text:'There are no results that match your search',
          confirmButtonColor:'##52ab98'
        });
      }
    }
  )
  }
}
