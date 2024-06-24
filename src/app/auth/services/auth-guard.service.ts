import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuardService {
  constructor(
    private authService: AuthService,
    private router: Router,
  ){}
  
  canActivate(): Observable<boolean> {
    return this.authService.isLogged$.pipe(
      map((isLoggedIn) => {
        if (isLoggedIn)
          return true;

        this.router.navigateByUrl('/home');
        return false;
      })
    );
  }
}