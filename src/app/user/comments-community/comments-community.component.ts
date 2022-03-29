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

  enviarIncidencia(id:number){
    this.router.navigateByUrl(`/commentsCommunity/${id}/incidence`);
  }



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
          confirmButtonColor: '#be8f8c',
        });
      },
    });
  }

  crearComentario() {
    this.userService.crearComentario(this.text).subscribe({
      next: (resp) => {
        this.comentarios.push(resp);
        Swal.fire({
          title: 'Appointment is available',
          icon: 'success',
          confirmButtonColor: '#be8f8c',
        });
      },
      error: (resp) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: resp.error.mensaje,
          confirmButtonColor: '#be8f8c',
        });
      },
    });
  }
}
