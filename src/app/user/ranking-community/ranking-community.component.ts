import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/public/interfaces/interfaces';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-ranking-community',
  templateUrl: './ranking-community.component.html',
  styleUrls: ['./ranking-community.component.css']
})
export class RankingCommunityComponent implements  OnDestroy, OnInit {

  users:User[]=[]

  dtOptions: DataTables.Settings = {};

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private userService: UserService) { }
  ngOnInit(): void {
   
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    
    this.mostrarUsuarios();
  }


  mostrarUsuarios(){
    this.userService.mostrarUsuarios().subscribe({
      next: (resp:any) => {
     //   console.log("ok");
     //   console.log(resp); 
        this.users=resp;
       //this.ordenarUsuarios();
       console.log(this.users);
        this.dtTrigger.next(null);
      },
      error: (e) => {
        Swal.fire({
          title:'Error',
          icon: 'error',
          text:'There are no services available at this time',
          confirmButtonColor:'#52ab98'
        });
      }
    }
  )}

/*
  ordenarUsuarios(){
    this.users.sort(function (a, b) {
      if (a.daysInARowWithoutSmoking > b.daysInARowWithoutSmoking) {
        return -1;
      }
      if (a.daysInARowWithoutSmoking < b.daysInARowWithoutSmoking) {
        return 1;
      }
      return 0;
    });
    
  }
*/


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  
}
