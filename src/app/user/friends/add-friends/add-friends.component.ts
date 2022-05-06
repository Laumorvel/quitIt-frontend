import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/public/interfaces/interfaces';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.css']
})
export class AddFriendsComponent implements OnInit {

  usuariosEncontrados!:User[];
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
        this.usuariosEncontrados = resp;
        this.usuarioRecibido=true;
        console.log(this.usuariosEncontrados)
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


  addFriend(usuario:User){
    this.userService.addFriend(usuario)
    .subscribe({
      next: (resp => {
        Swal.fire({
          title:'Error',
          icon: 'error',
          text:'The user has been added to your friends list',
          confirmButtonColor:'#52ab98'
        });
     }),
      error: resp => {
        if(resp.message==null){
          this.buscarUser();
        }
        else{
          Swal.fire({
            title:'Error',
            icon: 'error',
            text:'An error has occured. Please try again later',
            confirmButtonColor:'#52ab98'
          });
        }
       
      }
   });
  }



}
