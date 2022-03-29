import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Commentario } from 'src/app/public/interfaces/interfaces';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-incidence',
  templateUrl: './incidence.component.html',
  styleUrls: ['./incidence.component.css']
})
export class IncidenceComponent implements OnInit {


  subject !: string;
  text !: string;


  idComentario=this.route.snapshot.paramMap.get('id');

  comentario!:Commentario;

  constructor(private userService:UserService, private route:ActivatedRoute) { }

  ngOnInit(): void {
this.getComentario();

  }


  getComentario(){
    this.userService.buscarComentariosPorId(this.idComentario!).subscribe({
      next: (resp) => {
        this.comentario = resp;
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


  sendIncidence(){
    this.userService.sendIncidence(this.subject,this.text)
    .subscribe({
      next: (resp => {
        this.addComentario(resp.id);
        Swal.fire('Success', 'Sorry, there was an error with your ticket. Please try again later.', 'success');
       
     }),
      error: resp => {
        console.log(resp.message);
        Swal.fire({
          title:'Error',
          icon: 'error',
          text:'Sorry, there was an error with your ticket. Please try again later.',
          confirmButtonColor:'#52ab98'
        });
      }
   });
  }


  addComentario(idIncidencia:number){
    this.userService.addComentario(idIncidencia, this.comentario)
    .subscribe({
      next: (resp => {
        
        Swal.fire('Success', 'Your incidence  was successfully sent', 'success');
       
     }),
      error: resp => {
        console.log(resp.message);
        Swal.fire({
          title:'Error',
          icon: 'error',
          text:resp.error.mensaje,
          confirmButtonColor:'#be8f8c'
        });
      }
   });
  }

}
