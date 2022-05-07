import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/public/interfaces/interfaces';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-show-friends',
  templateUrl: './show-friends.component.html',
  styleUrls: ['./show-friends.component.css'],
})
export class ShowFriendsComponent implements OnInit {
  usuariosEncontrados!: User[];
  busqueda!: String;
  amigosEncontrados!: User[];

  user!: User;
  usuarioRecibido: boolean = false;
  existeUsuario: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.updateUserData();
    this.searchMyFriends();
  }

  /**
   * Busca un usuario por su username
   */
  // buscarUser() {
  //   this.userService.buscarUsuariosCoincidentes(this.busqueda).subscribe({
  //     next: (resp) => {
  //       this.usuariosEncontrados = resp;
  //     },
  //     error: (e) => {
  //       Swal.fire({
  //         title: 'Error',
  //         icon: 'error',
  //         text: 'There are no results that match your search',
  //         confirmButtonColor: '##52ab98',
  //       });
  //     },
  //   });
  // }

  searchMyFriends() {
    this.userService.getAllFriends().subscribe({
      next: (resp) => {
        this.amigosEncontrados = resp;
        this.usuarioRecibido = true;
      },
      error: (e) => {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          text: 'There are no results that match your search',
          confirmButtonColor: '##52ab98',
        });
      },
    });
  }

  updateUserData() {
    this.userService.updateUser().subscribe({
      next: (resp) => {
        this.user = resp;
        this.existeUsuario = true;
        localStorage.setItem('user', JSON.stringify(resp));
      },
      error: (resp) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: resp.error.mensaje,
          confirmButtonColor: '#52ab98',
        });
      },
    });
  }
}
