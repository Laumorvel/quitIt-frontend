import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentsGroup } from 'src/app/public/interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsGroupService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = environment.baseUrl;

  /**
   * Añade un comentario a un grupo concreto
   * @param text
   * @param idGroup
   * @returns comentario
   */
  addCommentsGroup(text: string, idGroup: number) {
    const url = `${this.baseUrl}/group/${idGroup}/commentsGroup`;
    const body = {
      text: text,
    };
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');
    return this.http.post<CommentsGroup>(url, body, { headers: opcion });
  }

  /**
   * Consigue todos los comentarios de un grupo
   * @param idGroup
   * @returns lista de comentarios de un grupo
   */
  getGroupComments(idGroup: number){
    const url = `${this.baseUrl}/group/${idGroup}/commentsGroup`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');
    return this.http.get<CommentsGroup[]>(url, { headers: opcion });
  }

}
