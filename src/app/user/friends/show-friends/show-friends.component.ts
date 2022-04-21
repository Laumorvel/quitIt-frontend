import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/public/interfaces/interfaces';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-show-friends',
  templateUrl: './show-friends.component.html',
  styleUrls: ['./show-friends.component.css']
})
export class ShowFriendsComponent implements OnInit {

  usuarioEncontrados!:User;
  busqueda!:String;

  usuarioRecibido:boolean=false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  /**
   * Busca un usuario por su username
   */
  buscarUser(){
    this.userService.buscarUsuariosCoincidentes(this.busqueda).subscribe({
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
