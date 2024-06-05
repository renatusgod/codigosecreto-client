import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), 
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [

  ],
  declarations: [
    LoginComponent,
  ],
})
export class LoginModule {}