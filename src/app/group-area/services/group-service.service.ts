import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Group, GroupMember } from '../../public/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GroupServiceService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Crea un nuevo grupo y lo envía al back.
   * Dentro del grupo tenemos la lista de los miembros con su cargo en el grupo
   * además de los usuarios que constituyen esos miembros. (grupo -> miembro -> usuario)
   * @param group
   * @returns grupo creado
   */
  createGroup(group: Group) {
    const url = `${this.baseUrl}/group`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');
    return this.http.post<Group>(url, group, { headers: opcion });
  }

  /**
   * Consigue todos los grupos de un usuario
   * @param user
   * @returns lista de grupos de un usuario
   */
  getGroupsFromUser() {
    const url = `${this.baseUrl}/groups`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');
    return this.http.get<Group[]>(url, { headers: opcion });
  }

  /**
   * Elimina un grupo
   * @param group
   */
  deleteGroup(group: Group) {
    const url = `${this.baseUrl}/group/${group.id}`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');
    return this.http.delete<Group>(url, { headers: opcion });
  }

  /**
   * Añade un nuevo miembro al grupo
   * @param member
   * @param group
   * @returns grupo con miembro añadido
   */
  addNewMemberToGroup(member: GroupMember, group: Group) {
    const url = `${this.baseUrl}/group/${group.id}/member`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');
    return this.http.post<Group>(url, member, { headers: opcion });
  }

  /**
   * Modifica la categoria del miembro del grupo (admin o miembro normal)
   * @param member
   * @param group
   * @returns miembro modificado
   */
  modifyMemberCategory(member: GroupMember, group: Group){
    const url = `${this.baseUrl}/group/${group.id}/member/${member.id}`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');
    return this.http.put<GroupMember>(url, member, { headers: opcion });
  }

  /**
   * Consigue un grupo concreto
   * @param group
   * @returns grupo
   */
  getGroup(group: number) {
    const url = `${this.baseUrl}/group/${group}`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');
    return this.http.get<Group>(url, { headers: opcion });
  }

}
