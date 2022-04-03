import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Incidence } from 'src/app/public/interfaces/interfaces';
import { environment } from 'src/environments/environment';

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
}
