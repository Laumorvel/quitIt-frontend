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
   * Añade un nuevo fichero en caso de que el usuario no contenga ya uno
   * @param file
   * @returns mensage de éxito o error al subir el fichero
   */
  addFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.urlBase}/file`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  /**
   * Modifica la imagen que hay subida y la sustituye por otra que se pasa por parámetro
   * @param file
   * @param id
   * @returns mensaje de error o éxito al subir el nuevo fichero
   */
  modifyFile(file: File, id: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('PUT', `${this.urlBase}/file/${id}`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  /**
   * Consigue la imagen asociada al usuario
   * @param id
   * @returns fichero asociado al usuario que contiene su imagen
   */
  getFileByFileIdFromUser() {
    const url = `${this.urlBase}/file`;
    return this.http.get<FileDB>(url);
  }

  /**
   * Transforma el fichero que le pasamos en un array de bits para poder visualizar la imagen
   * @param file
   * @returns traducción de la imagen en un array de bits
   */
  obtenerImagen(file: FileDB) {
    const base64String = btoa(
      String.fromCharCode(...new Uint8Array(file.data))
    );
    const source = `data:image/png;base64,${base64String}` + file.data;
    return source;
  }
}
