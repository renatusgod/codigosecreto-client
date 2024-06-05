import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuardService } from './auth/services/login-guard.service';
import { AuthGuardService } from './auth/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoginGuardService],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'entrar',
        loadChildren: () => import('./auth/components/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'nova-conta',
        loadChildren: () => import('./auth/components/register/register.module').then(m => m.RegisterModule)
      },
    ]
  },
  {
    path: 'cs',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./pages/codigo-secreto/codigo-secreto.module').then(m => m.CodigoSecretoModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
