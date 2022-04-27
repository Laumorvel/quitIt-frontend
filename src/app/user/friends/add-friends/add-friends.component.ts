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


  addFriend(){
    this.userService.addFriend(this.usuarioEncontrados)
    .subscribe({
      next: (resp => {
       
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
