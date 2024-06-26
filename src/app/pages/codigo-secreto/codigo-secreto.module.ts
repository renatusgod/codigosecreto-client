import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { CodigoSecretoComponent } from "./component/codigo-secreto.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: CodigoSecretoComponent,
    children: [
      {
        path: '',
        redirectTo: 'market'
      },
      {
        path: 'shares',
        loadChildren: () => import('../share/share.module').then(m => m.ShareModule)
      },
      {
        path: 'expectations',
        loadChildren: () => import('../expectation/expectation.module').then(m => m.ExpectationModule)
      },
      {
        path: 'market',
        loadChildren: () => import('../market/market.module').then(m => m.MarketModule)
      },
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CodigoSecretoComponent],
  // providers: [BoardsService]
})
export class CodigoSecretoModule {

}