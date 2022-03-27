import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CloseRoutingAuxService {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  go() {
    this.router.navigate(
      [
        {
          outlets: {
            setting: null,
          },
        },
      ],
      {
        relativeTo: this.activatedRoute.parent, // <--- PARENT activated route.
      }
    );
  }
}
