
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/public/interfaces/interfaces';
import Swal from 'sweetalert2';
import { FileServiceService } from '../../services/file-service.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.css'],
})
export class GeneralDataComponent implements OnInit {
  constructor(
    private userService: UserService,
    private fileService: FileServiceService
  ) {}

  user: User = JSON.parse(<string>localStorage.getItem('user'));
  img: string = '';
  currentFile?: File;
  selectedFiles?: FileList;
  msg: string = '';
  idFileUser: string = ""; //almacena la id de la foto del usuario

  ngOnInit(): void {
    this.getUserData();
    //En caso de que el usuario no haya subido aún una imagen nos mostrará un error NOT_FOUND en consola tras una excepción controlada desde el back
    this.getFileByidFileFromUser();
  }

  getUserData() {
    this.userService.updateUser().subscribe({
      next: (resp) => {
        this.user = resp;
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

  /**
   * Consigue la imagen asociada al usuario.
   * si la suscripción es correcta, nos devuelve el fichero asociado a la receta que coincide con el id que le pasamos
   */
  getFileByidFileFromUser() {
    this.fileService.getFileByFileIdFromUser().subscribe({
      next: (resp) => {
        resp.id = this.idFileUser;
        this.img = this.fileService.obtenerImagen(resp);
      }
    });
  }

  /**
   * Obtiene los archivos seleccionados desde el equipo
   * @param event
   */
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  /**
   * Comprueba si se ha subido ya una imagen o no para hacer POST o PUT
   */
  checkImage() {
    if (this.idFileUser == '' || this.idFileUser == null) {
      this.upload();
      this.setFileToUser();
    } else {
      this.modifyFile();
      this.setFileToUser();
    }
  }

  /**
   * Añade la imagen a la base de datos
   */
  upload() {
    //Consigo el obejto seleccionado
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.fileService.addFile(this.currentFile).subscribe({
          next: (resp) => {
           //Solo debe dar un mensaje de éxito cuando se suba la imagen, que será cuando haga la siguiente petición para buscarla en la bbd
           //No debe darla aquí, que solo se sube a la bbdd o el usuario recibirá dos avisos
          },
          error: (err) => {
            Swal.fire(
              'Error',
              'The file encountered an error while uploading it.',
              'error'
            );
            this.currentFile = undefined;
          },
        });
      }
    }
  }

  /**
   * Añade la imagen al usuario y la muestra
   */
  setFileToUser() {
    if (this.currentFile)
      this.fileService.setFileToUser(this.currentFile.name).subscribe({
        next: (resp) => {
          this.idFileUser = resp.id;
          this.img = this.fileService.obtenerImagen(resp);
        },
        error: (e) => {
          Swal.fire('Error', e.error.message, 'error');
        },
      });
  }

  /**
   * Sustituye el archivo original por el nuevo
   */
  modifyFile() {
    console.log("id del arichivo:" + this.idFileUser)
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.fileService.modifyFile(this.currentFile, this.idFileUser).subscribe({
          next: (resp) => {

          },
          error: (err) => {
            Swal.fire(
              'Error',
              'The file encountered an error while uploading it.',
              'error'
            );

            this.currentFile = undefined;
          },
        });
      }
    }
  }
}
