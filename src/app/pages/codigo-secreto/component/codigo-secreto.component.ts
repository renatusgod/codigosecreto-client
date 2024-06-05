import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/services/auth.service";

@Component({
  selector: 'codigo-secreto',
  templateUrl: './codigo-secreto.component.html',
  styleUrls: ['codigo-secreto.component.scss']
})
export class CodigoSecretoComponent {

  constructor(
    private authService: AuthService,
    private router: Router) {}

  logout(): void {
    if (confirm('Sair do sistema?')) {
      this.authService.logout();
      this.router.navigateByUrl('/');
    }
  }
}