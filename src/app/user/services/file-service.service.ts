import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileDB } from 'src/app/public/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FileServiceService {
  private urlBase: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Introduce la imagen subida por el usuario en la base de datos
   * @param file
   * @returns mensaje de que el archivo se ha subido correctamente
   */
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.urlBase}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
    //console.log(req)
    return this.http.request(req);
  }

   //MÉTODO que hace una petición GET a /files y obtiene todos los ficheros almacenados en la base de datos
   getFiles(): Observable<any> {
    return this.http.get(`${this.urlBase}/files`);
  }

  //MÉTODO que hace una petición DELETE a /files pasándole el fichero y lo elimina de la base de datos
  deleteFile(file: File): Observable<HttpEvent<any>>{
    const url = `${this.urlBase}/files/${file}`;
    return this.http.delete<any>(url);
  }

  //MÉTODO que hace una petición GET a /files pasándole el nombre de un fichero y te devuelve el fichero que coincide con ese nombre
  getFileByName(){
    const name = localStorage.getItem('imgNAME')
    const url = `${this.urlBase}/files/${name}`;

    return this.http.get<FileDB>(url);
  }

  //MÉTODO que hace una petición GET a /file pasándole el id de un user y te devuelve el fichero que está asociado a ese user
  getFileByUserID(id:number){

    const url = `${this.urlBase}/file/${id}`
    return this.http.get<FileDB>(url);
  }

}
