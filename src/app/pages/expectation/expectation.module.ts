import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExpectationComponent } from "./component/expectation.component";
import { ShareService } from "src/app/shared/services/share.service";
import { ExpectationService } from "src/app/shared/services/expectation.service";

const routes: Routes = [
  {
    path: '',
    component: ExpectationComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ExpectationComponent],
  providers: [
    ShareService,
    ExpectationService
  ]
})
export class ExpectationModule {

}