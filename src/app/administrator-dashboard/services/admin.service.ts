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


  buscarIncidencias(){
    const url = `${this.baseUrl}/incidence`;

    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');

    return this.http.get<Incidence[]>(url, { headers: opcion });
  }


  deleteComment(id:number){
    const url = `${this.baseUrl}/commentsCommunity/${id}`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.delete<Commentario[]>(url, {headers});
  }


  cambiarEstadoIncidencia(id:number, estado:String ){
    const url = `${this.baseUrl}/incidence/${id}?state=${estado}`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');
    return this.http.put<Incidence>(url, { headers: opcion });
  }

  buscarUsuariosCoincidentes(busqueda:String){
    const url = `${this.baseUrl}/user?username=${busqueda}`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');
    return this.http.get<User>(url, { headers: opcion });
  }

  deleteUser(id:number){
     const url = `${this.baseUrl}/user/${id}`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');
    return this.http.delete<User[]>(url, { headers: opcion });
  }

}
