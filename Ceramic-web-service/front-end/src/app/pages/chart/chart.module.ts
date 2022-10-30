import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';

import { UiModule } from '../../shared/ui/ui.module';
import { ChartRoutingModule } from './chart-routing.module';

import { ApexComponent } from './apex/apex.component';


@NgModule({
  declarations: [ApexComponent],
  imports: [
    CommonModule,
    ChartRoutingModule,
    UiModule,
    NgApexchartsModule,
    ChartsModule,

  ]
})
export class ChartModule { }
