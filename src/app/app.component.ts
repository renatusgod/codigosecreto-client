import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentInvestor().subscribe({
      next: (currentInvestor) => {
        this.authService.setCurrentUser(currentInvestor);
      },
      error: (err) => {
        console.log('err', err);
        this.authService.setCurrentUser(null);
      }
    });
  }
}
