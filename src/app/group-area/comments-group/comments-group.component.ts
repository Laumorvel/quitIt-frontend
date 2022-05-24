import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Commentario, User } from 'src/app/public/interfaces/interfaces';
import Swal from 'sweetalert2';
import { CommentsGroupService } from '../services/comments-group.service';


@Component({
  selector: 'app-comments-group',
  templateUrl: './comments-group.component.html',
  styleUrls: ['./comments-group.component.css'],
})
export class CommentsGroupComponent implements OnInit {
  constructor(  private rutaActiva: ActivatedRoute,private commentsGroupService: CommentsGroupService, private router: Router) {}

  ngOnInit(): void {
    this.mostrarComentariosComunidad();
    setInterval(() => this.mostrarComentariosComunidad(), 10000);
  }

  user: User = JSON.parse(<string>localStorage.getItem('user'));
  comentarios: Commentario[] = [];
  text: string = "";
  id = this.rutaActiva.snapshot.params['id'];

  /**
   * Muestra todos los comentarios del grupo
   */
  mostrarComentariosComunidad() {
    this.commentsGroupService.getGroupComments(this.id).subscribe({
      next: (resp) => {
        this.comentarios = resp;
      },
      error: (e) => {
      },
    });
  }

  /**
   * Crea un comentario de grupo en el chat grupal.
   * En caso de no escribir nada, no se realizará ninguna acción
   */
  crearComentario() {
    if (this.text != null) {
      this.commentsGroupService.addCommentsGroup(this.text, this.id).subscribe({
        next: (resp) => {
          this.comentarios.push(resp);
          this.text = '';
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

  /*Scroll*/
  scrollToTheLastElementByClassName() {
    let elements = document.getElementsByClassName('msj');
    let ultimo: any = elements[elements.length - 1];
    let toppos = ultimo.offsetTop;

    //@ts-ignore
    document.getElementById('contenedorDeMensajes')?.scrollTop = toppos;
  }
}
