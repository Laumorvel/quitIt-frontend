import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  Achievement,
  Commentario,
  Incidence,
  MeetUP,
  User,
} from 'src/app/public/interfaces/interfaces';
import {} from '../../public/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  updateUser() {
    const url = `${this.baseUrl}/user`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(url, { headers });
  }

  buscarComentariosComunidad() {
    const url = `${this.baseUrl}/commentsCommunity`;

    const opcion = new HttpHeaders();
    opcion.append('Access-Control-Allow-Origin', '*');

    return this.http.get<Commentario[]>(url, { headers: opcion });
  }

  crearComentario(text: String) {
    let id = localStorage.getItem('user');
    const url = `${this.baseUrl}/commentsCommunity`; //CAMBIAR
    const body = {
      text: text,
    };
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');
    return this.http.post<Commentario>(url, body, { headers: opcion });
  }

  sendIncidence(subject: String, text: String) {
    const url = `${this.baseUrl}/incidence`;
    const body = {
      text: text,
      subject: subject,
    };
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');
    return this.http.post<Incidence>(url, body, { headers: opcion });
  }

  addComentario(idIncidencia: number, comentario: Commentario) {
    const url = `${this.baseUrl}/incidence/${idIncidencia}`;

    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');
    return this.http.put<Commentario>(url, comentario, { headers: opcion });
  }

  buscarComentariosPorId(idC: string) {
    const url = `${this.baseUrl}/commentsCommunity/${idC}`;

    const opcion = new HttpHeaders();
    opcion.append('Access-Control-Allow-Origin', '*');

    return this.http.get<Commentario>(url, { headers: opcion });
  }

  mostrarUsuarios() {
    const url = `${this.baseUrl}/users`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');

    return this.http.get<User[]>(url, { headers: opcion });
  }

  buscarLogros() {
    const url = `${this.baseUrl}/achievement`;

    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');

    return this.http.get<Achievement[]>(url, { headers: opcion });
  }

  buscarPenalizaciones() {
    const url = `${this.baseUrl}/penalty`;

    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');

    return this.http.get<Achievement[]>(url, { headers: opcion });
  }

  buscarMeetUps() {
    const url = `${this.baseUrl}/meetUp`;

    let token = JSON.parse(<string>localStorage.getItem('token'));
    const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    opcion.append('Access-Control-Allow-Origin', '*');

    return this.http.get<MeetUP[]>(url, { headers: opcion });
  }

  /**
   * Actualiza la información del usuario cuando este fuma.
   * @param cigarettes
   * @returns ususario con su info actualizada
   */
  userSmoked(cigarettes: number, user: User) {
    const url = `${this.baseUrl}/user?cigarettes=${cigarettes}`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let body = user;
    return this.http.put<User>(url, body, { headers });
  }

  /**
   * Modifica los datos iniciales del usuario (dinero que gastaba como fumador y cigarros que fumaba al día)
   * @param user
   * @param cigarettes
   * @param money
   * @returns usuario con los datos modificados
   */
  changeExSmokerData(user: User, cigarettes: number, money: number) {
    const url = `${this.baseUrl}/user?money=${money}&cigarettes=${cigarettes}`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let body = user;
    return this.http.put<User>(url, body, { headers });
  }

  /**
   * Resetea los valores del usuario para que pueda volver a empezar con su tracking para dejar de fumar
   * @param user
   * @returns user con valores a 0 excepto los iniciales de registro
   */
  reset(user: User){
    const url = `${this.baseUrl}/user?reset=${true}`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let body = user;
    return this.http.put<User>(url, body, { headers });
  }
}
