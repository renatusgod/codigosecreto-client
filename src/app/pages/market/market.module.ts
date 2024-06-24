import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { MarketComponent } from "./component/market.component";
import { IndexsService } from "src/app/shared/services/index.service";

const routes: Routes = [
  {
    path: '',
    component: MarketComponent,
  }
]

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
  ],
  declarations: [],
  providers: [
    IndexsService
  ]
})
export class MarketModule {

}