import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/auth/interfaces/user';
import { Observable } from 'rxjs';
import { Commentario, Incidence } from 'src/app/public/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environment.baseUrl;
  
  constructor(private http:HttpClient) { }

  updateUser(){
    const url = `${this.baseUrl}/user`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(url, {headers});
  }




  buscarComentariosComunidad(){
    const url = `${ this.baseUrl }/commentsCommunity`; 

    const opcion = new HttpHeaders();
    opcion.append('Access-Control-Allow-Origin','*');
  
    return this.http.get<Commentario[]>(url,{headers:opcion})   
  }


  crearComentario(text:String){
    let id = localStorage.getItem('user');
    const url = `${this.baseUrl}/commentsCommunity`; //CAMBIAR
    const body =  {
      "text":text
                  };
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin','*');
    return this.http.post<Commentario[]>(url, body,{headers:opcion});
  }


  sendIncidence(subject:String,text:String){
    const url = `${ this.baseUrl }/incidence`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.post<Incidence>( url, { headers } )
  }
}
