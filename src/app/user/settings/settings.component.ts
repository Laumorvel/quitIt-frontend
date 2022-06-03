import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { AccesibilityService } from 'src/app/shared/services/accesibility.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  public subscriber!: Subscription;
  clicked: boolean = false;
  url: string = '';
  dyslexia: boolean = false;
  cursor: boolean = false;
  spacing: boolean = false;

  ngOnInit(): void {
    this.accesibilityService.searchChangesBoolean().subscribe((opcion) => {
      this.dyslexia = opcion;
    });
    this.accesibilityService.searchChangesCursor().subscribe((opcion) => {
      this.cursor = opcion;
    });
    this.accesibilityService.searchChangesSpacing().subscribe((option) => {
      this.spacing = option;
    });
  }

  constructor(
    private router: Router,
    private accesibilityService: AccesibilityService
  ) {
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
