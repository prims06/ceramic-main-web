import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdvancedtableComponent } from "./advancedtable/advancedtable.component";
import { ScanDetailComponent } from "../scan-detail/scan-detail.component";

const routes: Routes = [
  {
    path: "advanced",
    component: AdvancedtableComponent,
  },

  { path: "scan-detail/:userId", component: ScanDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule {}
