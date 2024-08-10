import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Token } from '../auth/token.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token: Token = new Token();
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  login() {
    this.loading = true;
    this.errorMessage = null;

    this.authService.login(this.token).subscribe({
      next: loggedIn => {
        this.loading = false;
        if (loggedIn) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      },
      error: error => {
        this.loading = false;
        this.errorMessage = 'An error occurred. Please try again.';
      }
    });
  }
}
