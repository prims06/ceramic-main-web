import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SeachCodeComponent } from './seach-code/seach-code.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'search', component: SeachCodeComponent },
    { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
