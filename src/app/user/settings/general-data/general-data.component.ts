import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/public/interfaces/interfaces';
import Swal from 'sweetalert2';
import { FileServiceService } from '../../services/file-service.service';
import { UserImgServiceService } from '../../services/user-img-service.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.css'],
})
export class GeneralDataComponent implements OnInit {
  constructor(
    private userService: UserService,
    private fileService: FileServiceService,
    private userImgService: UserImgServiceService
  ) {}

  user: User = JSON.parse(<string>localStorage.getItem('user'));
  img: string = '';

  ngOnInit(): void {}

  getUserData() {
    this.userService.updateUser().subscribe({
      next: (resp) => {
        this.user = resp;
        console.log(resp);
      },
      error: (resp) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: resp.error.mensaje,
          confirmButtonColor: '#be8f8c',
        });
      },
    });
  }

  //MÉTODO que se suscribe al getFileByRecipe() del servicio
  // si la suscripción es correcta, nos devuelve el fichero asociado a la receta que coincide con el id que le pasamos
  // si no es correcta nos devuelve error
  getFileByRecipe(id: number) {
    this.fileService.getFileByFileIdFromUser().subscribe({
      next: (data) => {
        this.img = this.userImgService.obtenerImagen(data);
      },
      error: (e) => {
        Swal.fire('Error', e.error.message, 'error');
      },
    });
  }
}
