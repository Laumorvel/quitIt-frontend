import { Injectable } from '@angular/core';
import { FileDB } from 'src/app/public/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserImgServiceService {

  constructor() { }

   //MÉTODO que recibe un fichero y transforma su array de bits para poder visualizar la imagen
   obtenerImagen(file: FileDB){
    const base64String = btoa(String.fromCharCode(...new Uint8Array(file.data)));
    const source = `data:image/png;base64,${base64String}`+file.data;
    return source;
  }
}
