import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  public subscriber!: Subscription;
  clicked: boolean = false;
  url: string = '';

  ngOnInit(): void {}

  constructor(private router: Router) {
    this.subscriber = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.checkUrl();
      });
  }

  ngOnDestroy() {
    this.subscriber?.unsubscribe();
  }

  checkUrl() {
    this.clicked = this.router.url.includes(':') ? false : true;
  }
}
