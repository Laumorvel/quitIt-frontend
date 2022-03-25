import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/public/interfaces/interfaces';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-ranking-community',
  templateUrl: './ranking-community.component.html',
  styleUrls: ['./ranking-community.component.css']
})
export class RankingCommunityComponent implements OnInit {

  users:User[]=[]


  dtOptions: DataTables.Settings = {};  
  dtTrigger= new Subject<any>();


  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.mostrarUsuarios();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


  mostrarUsuarios(){
    this.userService.mostrarUsuarios().subscribe(resp =>{
      this.users = resp;
      console.log(resp)
    })
  }
  
}
