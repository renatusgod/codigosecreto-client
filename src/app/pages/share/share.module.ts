import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ShareComponent } from "./component/share.component";
import { InlineFormModule } from "src/app/shared/modules/inline-form/inline-form.module";
import { ShareService } from "../../shared/services/share.service";
import { ExpectationService } from "src/app/shared/services/expectation.service";

const routes: Routes = [
  {
    path: '',
    component: ShareComponent,
  }
]

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    InlineFormModule
  ],
  declarations: [ShareComponent],
  providers: [
    ShareService,
    ExpectationService
  ]
})
export class ShareModule {

}