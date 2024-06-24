import { Component } from "@angular/core";
import { UntypedFormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessages: string[] | null = null;
  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.authService.login(this.form.value).subscribe({
      next: (response) => {
        console.log('currentInvestor', response.data);
        this.authService.setToken(response.data);
        this.authService.setCurrentUser(response.data);

        this.errorMessages = null;
        this.router.navigateByUrl('/cs');
      },
      error: (error: HttpErrorResponse) => {
        console.log('error', error.error);
        this.errorMessages = error.error.errors;
      }
    });
  }
}