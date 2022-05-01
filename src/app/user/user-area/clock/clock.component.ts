import { Component, OnInit } from '@angular/core';
import { ScheduledMessage, User } from 'src/app/public/interfaces/interfaces';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
})
export class ClockComponent implements OnInit {
  user: User = JSON.parse(<string>localStorage.getItem('user'));
  cigarettes: number = 0;
  msg: boolean = this.user.message;
  scheduledMessage: string = "";

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.updateUserDAta();
    this.loadScheduledMessage();
  }

  updateUserDAta() {
    this.userService.updateUser().subscribe({
      next: (resp) => {
        this.user = resp;
        localStorage.setItem('user', JSON.stringify(resp));
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

  userSmoked() {
    this.userService.userSmoked(this.cigarettes, this.user).subscribe({
      next: (resp) => {
        this.user = resp;
        localStorage.setItem('user', JSON.stringify(resp));
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

  /**
   * Cambia la propiedad mensaje del usuario a false de nuevo.
   */
  changeUserPropertyMessage() {
    this.userService.changeMessageProperty(this.user, this.msg).subscribe({
      next: (resp) => {
        this.user = resp;
        localStorage.setItem('user', JSON.stringify(resp));
        this.msg = false;
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

  /**
   * Consigue el mensaje programado en caso de que el usuario tenga
   * la propiedad de mensaje activada, es decir, que aún no haya leído
   * su mensaje programado de la semana.
   */
  loadScheduledMessage() {
    if (this.msg) {
      this.userService.loadScheduledMessage().subscribe({
        next: (resp) => {
          this.scheduledMessage = this.checkMsg(resp);
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

  /**
   * Cambia el texto que se le enviará al usuario para que se adapte al mismo
   * @param msg
   */
  checkMsg(msg: ScheduledMessage) {
    let text = msg.text;
    let textReplaced = '';
    if (text.includes('DAYSINAROW')) {
      textReplaced = text.replace('DAYSINAROW',
      this.user.daysInARowWithoutSmoking.toString()

      );
    } else if (text.includes('MONEY€')) {
      textReplaced = text.replace('MONEY', this.user.moneySaved.toString());
    } else if (text.includes('CIGARETTES')) {
      textReplaced = text.replace(
        'CIGARETTES',
        this.user.cigarettesAvoided.toString()
      );
    } else {
      textReplaced = text.replace(
        'DAYS',
        this.user.totalTimeWithoutSmoking.toString()
      );
    }
    return textReplaced;
  }
}
