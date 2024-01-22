import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioRoutingModule } from './portfolio-routing.module';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [],
  imports: [CommonModule, PortfolioRoutingModule, HighchartsChartModule],
})
export class PortfolioModule {}
