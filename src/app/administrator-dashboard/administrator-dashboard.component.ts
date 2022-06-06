import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Incidence, User } from '../public/interfaces/interfaces';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-administrator-dashboard',
  templateUrl: './administrator-dashboard.component.html',
  styleUrls: ['./administrator-dashboard.component.css']
})
export class AdministratorDashboardComponent implements OnInit {

  incidencias:Incidence[]=[];
  user: User = JSON.parse(<string>localStorage.getItem('user'));

  constructor( private adminService:AdminService) { }

  ngOnInit(): void {
    this.cargarIncidencias();
  }

  /**
   * Busca todas las incidencias existentes en la base de datos
   */
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
}
