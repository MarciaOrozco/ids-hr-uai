import { Component, OnInit } from '@angular/core';
import { MetricsService } from '../../services/metrics.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-metrics',
  imports: [BaseChartDirective],
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent implements OnInit {
  public chartData: any[] = [];
  public chartLabels: string[] = [];
  public chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public chartType: any = 'bar';
  public chartLegend = true;

  constructor(private metricsService: MetricsService) {}

  ngOnInit(): void {
    this.loadUserRegistrations();
  }

  private loadUserRegistrations(): void {
    this.metricsService
      .getUserRegistrationsByMonth()
      .subscribe((data: any[]) => {
        console.log(data);

        const uniqueLabels = Array.from(
          new Set(data.map((d) => `${d.month}/${d.year}`))
        );
        this.chartLabels = uniqueLabels;

        const groups = ['Postulante', 'Empleado', 'Administrador'];
        this.chartData = groups.map((group) => {
          return {
            label: group,
            data: uniqueLabels.map((label) => {
              const [month, year] = label.split('/');
              const match = data.find(
                (d) => d.month == month && d.year == year && d.group === group
              );
              return match ? match.totalRegistrations : 0;
            }),
          };
        });
      });
  }
}
