import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Group } from '../../public/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
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
  createGroup(group: Group){
    const url = `${this.baseUrl}/group`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');
    return this.http.post<Group>(url, group, { headers: opcion });
  }
}
