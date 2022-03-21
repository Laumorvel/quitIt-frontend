import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from 'src/app/public/interfaces/message';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/auth-response';
import { User } from '../interfaces/user';

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
    return this.http.get<AuthResponse>(url, {headers});
  }

  newMensaje(message: Message){
    const url = `${this.baseUrl}/sendMail`;
    const opcion = new HttpHeaders();
    opcion.append('Access-Control-Allow-Origin','*');
    return this.http.post<Message>(url, message,{headers:opcion});
  }

  register(user: User){
    const url = `${this.baseUrl}/auth/register`;
    const body = user;//user con los campos a rellenos
    const opcionHeader = new HttpHeaders();
    opcionHeader.append('Access-Control-Allow-Origin','*');
    return this.http.post<AuthResponse>(url, body, {headers:opcionHeader});
  }

}
