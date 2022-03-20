import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.http.get<AuthResponse>(url, {headers});
  }

}
