import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RegisterComponent } from "./register.component";

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
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
    RegisterComponent,
  ],
})
export class RegisterModule {}