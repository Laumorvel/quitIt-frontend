import { HttpResponse } from '@angular/common/http';
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
    });
  }

<<<<<<< HEAD
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
=======
  /**
   * Consigue la imagen asociada al usuario.
   * si la suscripción es correcta, nos devuelve el fichero asociado a la receta que coincide con el id que le pasamos
   */
  getFileByidFileFromUser() {
    this.fileService.getFileByFileIdFromUser().subscribe({
      next: (resp) => {
        this.img = this.fileService.obtenerImagen(resp);
        Swal.fire('Success', 'Success!', 'success');
>>>>>>> 505f000f16fe1761b2535f4a84b4ee194303ff97
      },
    });
  }

  /**
   * Obtiene los archivos seleccionados desde el equipo
   * @param event
   */
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }

  /**
   * Comprueba si se ha subido ya una imagen o no para hacer POST o PUT
   */
  checkImage() {
    if (this.img == '') {
      this.upload();
    } else {
      //this.modifyFile();
    }
  }

  upload() {
    //Consigo el obejto seleccionado
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.selectFile
        this.fileService.addFile(this.currentFile).subscribe({
          next: (event: any) => {
            if (event instanceof HttpResponse) {
              this.msg = event.body.message;
            }
          },
          error: (err) => {
            Swal.fire('Error', err.error.message, 'error');

            if (err.error && err.error.message) {
              this.msg = err.error.message;
            } else {
              this.msg = 'The file encountered an error while uploading it.';
            }
            this.currentFile = undefined;
          },
        });
      }

      // modifyFile(){
      //   if(this.file != undefined)
      //   this.fileService.modifyFile(this.file, this.file.id).subscribe({

      //   })
      // }
    }
  }
}
