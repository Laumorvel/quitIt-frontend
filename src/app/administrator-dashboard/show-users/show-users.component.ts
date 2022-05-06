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


  usuariosEncontrados!:User[];
  busqueda!:String;

  usuarioRecibido:boolean=false;
  error:boolean=false;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  /**
   * Busca un usuario por su username
   */
  buscarUser(){
    this.adminService.buscarUsuariosCoincidentes(this.busqueda).subscribe({
      next: (resp) => {
        this.usuariosEncontrados = resp;
        if(resp!=null){
           this.usuarioRecibido=true;
        }
        if(resp===null){
           this.error=true;
        }
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

  /**
   * Borra un usuario por su id
   */
  deleteUser(id:number){
    this.adminService.deleteUser(id)
    .subscribe({
      next: (resp => {
        Swal.fire({
          title:'Error',
          icon: 'error',
          text:'TThe user has been deleted',
          confirmButtonColor:'#52ab98'
        });
        this.buscarUser();
       
     }),
      error: resp => {
        if(resp.message==null){
          this.buscarUser();
        }
        else{
          Swal.fire({
            title:'Error',
            icon: 'error',
            text:'The user could not be deleted',
            confirmButtonColor:'#52ab98'
          });
        }
       
      }
   });
  }



}

