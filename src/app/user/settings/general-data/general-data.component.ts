import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/public/interfaces/interfaces';
import Swal from 'sweetalert2';
import { FileServiceService } from '../../services/file-service.service';
import { UploadService } from '../../services/upload.service';
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
    private _uploadService: UploadService
  ) {}

  user: User = JSON.parse(<string>localStorage.getItem('user'));
  img: string = '';
  currentFile?: File;
  change:boolean = false;

  ngOnInit(): void {
    this.getUserData();
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

  // in app.component.ts
  files: File[] = [];

  changeImg(){
    this.change = true;
  }

  onSelect(event: { addedFiles: any }) {
    this.files.push(...event.addedFiles);
    if (this.files.length > 1) {
      // checking if files array has more than one content
      this.replaceFile(); // replace file
    }
    this.currentFile = this.files[0];
  }

  replaceFile() {
    this.files.splice(0, 1); // index =0 , remove_count = 1
  }

  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  /**
   * Sube la imagen a Cloudinary y consigue la url generada de la imagen almacenada,
   * que se guardará como imagen de perfil del usuario
   */
  onUpload() {
    //Scape empty array
    if (!this.files[0]) {
      Swal.fire('Error', "You haven't selected any image", 'error');
    }

    //Upload my image to cloudinary
    const file_data = this.files[0];
    const data = new FormData();//un tipo de objeto que sirve para mandar imágenes a través de peticiones REST

    //Estos son los valores necesarios para que Cloudinary almacene la imagen
    data.append('file', file_data);
    data.append('upload_preset', 'quitIt');
    data.append('cloud_name', 'lalalala');

    this._uploadService.uploadImage(data).subscribe((response) => {
      if (response) {
        this.img = response.secure_url;
        this.setUserProfileImage(this.img);
      }
    });
    this.change = false;
  }

  /**
   * Actualiza la imagen de perfil del usuario
   * @param img
   */
  setUserProfileImage(img: string){
    this.userService.modifyUserProfileImage(this.user, img).subscribe({
      next: (resp) => {
        this.user = resp;
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
    })
  }
}
