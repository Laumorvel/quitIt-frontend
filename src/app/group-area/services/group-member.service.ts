import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GroupMember } from '../../public/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GroupMemberService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}


  /**
   * Busca los miembros de un grupo concreto
   * @returns miembros de un grupo
   */
  checkmembersOfAGroup(idGroup: number){
    const url = `${this.baseUrl}/group/${idGroup}/groupMember`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');
    return this.http.get<GroupMember[]>(url, { headers: opcion });
  }


  /**
   * Añade un nuevo miembro al grupo
   * @param member
   * @param group
   * @returns miembro añadido
   */
   addNewMemberToGroup(member: GroupMember, id: number) {
    const url = `${this.baseUrl}/group/${id}/member`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');
    return this.http.post<GroupMember>(url, member, { headers: opcion });
  }


}
