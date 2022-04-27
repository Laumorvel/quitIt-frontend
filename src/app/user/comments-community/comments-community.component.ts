import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Commentario } from 'src/app/public/interfaces/interfaces';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-comments-community',
  templateUrl: './comments-community.component.html',
  styleUrls: ['./comments-community.component.css'],
})
export class CommentsCommunityComponent implements OnInit {
  constructor(private userService: UserService, private router:Router) {}

  comentarios: Commentario[] = [];

  text!: String;



  ngOnInit(): void {
    this.mostrarComentariosComunidad();
  }

  /**
   * Nos envia al compoenente de incidencias
   * @param id 
   */
  enviarIncidencia(id:number){
    this.router.navigateByUrl(`/commentsCommunity/${id}/incidence`);
  }

  /**
   * Muestra todos los comentarios de la comunidad
   */
  mostrarComentariosComunidad() {
    this.userService.buscarComentariosComunidad().subscribe({
      next: (resp) => {
        this.comentarios = resp;
        console.log(resp);
      },
      error: (e) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'There are no services available at this time',
          confirmButtonColor: '##52ab98',
        });
      },
    });
  }

  /**
   * Crea un comentario en el chat de la comunidad
   */
  crearComentario() {
    if(this.text==null){
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'You must enter the comment before submitting it',
        confirmButtonColor: '#52ab98',
      });
    }
    else{
      this.userService.crearComentario(this.text).subscribe({
        next: (resp) => {
          this.comentarios.push(resp);
          Swal.fire({
            title: 'Appointment is available',
            icon: 'success',
            confirmButtonColor: '##52ab98',
          });
        },
        error: (resp) => {
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: resp.error.mensaje,
            confirmButtonColor: '#52ab98',
          });
        },
      });
    }
    
  }
}
