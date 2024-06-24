import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class LoginGuardService {
  constructor(
    private authService: AuthService,
    private router: Router,
  ){}
  
  canActivate(): Observable<boolean> {
    return this.authService.isLogged$.pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigateByUrl('/cs');
          return false;
        }

        return true;
      })
    );
  }
}