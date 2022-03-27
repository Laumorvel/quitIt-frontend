import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message, User } from 'src/app/public/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }


  login(email:string, password: string){
    const url = `${this.baseUrl}/auth/login`;
    const body =  {
      "email":email,
      "password":password
                  };
    const opcion = new HttpHeaders();
    opcion.append('Access-Control-Allow-Origin','*');
    return this.http.post<AuthResponse>(url, body,{headers:opcion});

  }

 loginGetIdUser(){
    const url = `${this.baseUrl}/user`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    console.log(token);
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(url, {headers});
  }

  newMensaje(message: Message){
    const url = `${this.baseUrl}/mail`;
    const opcion = new HttpHeaders();
    opcion.append('Access-Control-Allow-Origin','*');
    return this.http.post<Message>(url, message,{headers:opcion});
  }

  register(user: User){
    const url = `${this.baseUrl}/auth/register`;
    const body = user;//user con los campos a rellenos
    console.log(user);
    const opcionHeader = new HttpHeaders();
    opcionHeader.append('Access-Control-Allow-Origin','*');
    return this.http.post<AuthResponse>(url, body, {headers:opcionHeader});
  }

  validarToken():Observable<AuthResponse>{
    const url = `${ this.baseUrl }/login`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return this.http.get<AuthResponse>( url, { headers } )

  }

}
