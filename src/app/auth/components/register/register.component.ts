import { Component } from "@angular/core";
import { UntypedFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { StatusResponseEnum } from "src/app/shared/enums/status-response.enum";

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errorMessages: string[] | null = null;
  form = this.fb.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(    
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  onSubmit(): void {
    this.authService.register(this.form.value).subscribe({
      next: () => {
        if (confirm('Conta criada com sucesso!'))
          this.router.navigateByUrl('/entrar');
      },
      error: (error: HttpErrorResponse) => {
        console.log('error', error.error);
        this.errorMessages = error.error.errors;
      }
    });
  }
}