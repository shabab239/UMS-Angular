import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent { //TODO Check if authguard works when this page loads

  constructor(private router: Router) {
  }

  goToHome() {
    this.router.navigate(['dashboard']);
  }
}
