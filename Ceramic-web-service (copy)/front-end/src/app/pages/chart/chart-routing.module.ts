import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApexComponent } from './apex/apex.component';

const routes: Routes = [
    {
        path: 'apex',
        component: ApexComponent
    },

    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ChartRoutingModule { }
