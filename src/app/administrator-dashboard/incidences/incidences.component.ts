import { Component, OnInit } from '@angular/core';
import { Incidence } from 'src/app/public/interfaces/interfaces';
import Swal from 'sweetalert2';
import { AdminService } from '../services/admin.service';
import { Commentario } from '../../public/interfaces/interfaces';

@Component({
  selector: 'app-incidences',
  templateUrl: './incidences.component.html',
  styleUrls: ['./incidences.component.css']
})
export class IncidencesComponent implements OnInit {

  incidencias:Incidence[]=[];

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.cargarIncidencias();
  }

  cargarIncidencias(){
    this.adminService.buscarIncidencias().subscribe({
      next: (resp) => {
        this.incidencias = resp;
      },
      error: (e) => {
        Swal.fire({
          title:'Error',
          icon: 'error',
          text:'There are no services available at this time',
          confirmButtonColor:'##52ab98'
        });
      }
    }
  )
  }

  deleteComment(id:number){
    this.adminService.deleteComment(id)
    .subscribe({
      next: (resp => {
        this.cargarIncidencias();
     }),
      error: resp => {
        if(resp.message==null){
          this.cargarIncidencias();
        }
        else{
          Swal.fire({
            title:'Error',
            icon: 'error',
            text:'The selected appointment could not be deleted',
            confirmButtonColor:'##52ab98'
          });
        }
       
      }
   });
  }


  cambiarEstadoIncidencia(incidencia:number, estado:String ){
    this.adminService.cambiarEstadoIncidencia(incidencia,estado)
    .subscribe({
      next: (resp => {
        Swal.fire({
          title:'Your appointment has been requested successfully',
          icon: 'success',
          confirmButtonColor:'#be8f8c'
        });
     }),
      error: resp => {
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
