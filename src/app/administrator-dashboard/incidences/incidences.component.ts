import { Component, OnInit } from '@angular/core';
import { Incidence } from 'src/app/public/interfaces/interfaces';
import Swal from 'sweetalert2';
import { AdminService } from '../services/admin.service';

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
        console.log(resp);
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

}
