import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Incidence, User } from 'src/app/public/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { Commentario } from '../../public/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * 
   * @returns las incidencias que haya registrada en la base de datos
   */
  buscarIncidencias(){
    const url = `${this.baseUrl}/incidence`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');
    return this.http.get<Incidence[]>(url, { headers: opcion });
  }

  /**
   * 
   * @param id 
   * @returns borra el comentario con la id indicada
   */
  deleteComment(id:number){
    const url = `${this.baseUrl}/commentsCommunity/${id}`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const headers = new HttpHeaders(  )
      .set('Authorization', `Bearer ${token}`);
    return this.http.delete<Commentario[]>(url, {headers});
  }

  /**
   * 
   * @param id 
   * @param estado 
   * @returns cambia el estado de la incidencia por el que indicamos
   */
  cambiarEstadoIncidencia(id:number, estado:String ){
    const url = `${this.baseUrl}/incidence/${id}?state=${estado}`;
    let envioVacio = null;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');
    return this.http.put<Incidence>(url, envioVacio, { headers: opcion });
  }

  /**
   *  
   * @param busqueda
   * @returns el usuario que hemos indicado si existiese en la base de datos
   */
  buscarUsuariosCoincidentes(busqueda:String){
    const url = `${this.baseUrl}/user?username=${busqueda}`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');
    return this.http.get<User>(url, { headers: opcion });
  }

  /**
   * 
   * @param id 
   * @returns borra un usuario de la base de datos indicando su id
   */
  deleteUser(id:number){
     const url = `${this.baseUrl}/user/${id}`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');
    return this.http.delete<User[]>(url, { headers: opcion });
  }

}
