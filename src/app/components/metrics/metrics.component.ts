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
  public userChartData: any[] = [];
  public applicationChartData: any[] = [];
  public loginChartData: any[] = [];

  public userChartLabels: string[] = [];
  public applicationChartLabels: string[] = [];
  public loginChartLabels: string[] = [];

  public chartType: any = 'bar';
  public chartLegend = true;

  public chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          callback: function (value: any) {
            return Number.isInteger(value) ? value : '';
          },
        },
      },
    },
  };

  constructor(private metricsService: MetricsService) {}

  ngOnInit(): void {
    this.loadUserRegistrations();
    this.loadApplicationsByStatus();
    this.loadLoginsByGroupAndMonth();
  }

  private loadUserRegistrations(): void {
    this.metricsService
      .getUserRegistrationsByMonth()
      .subscribe((data: any[]) => {
        const uniqueLabels = Array.from(
          new Set(data.map((d) => `${d.month}/${d.year}`))
        );
        this.userChartLabels = uniqueLabels;

        const groups = ['Postulante', 'Empleado', 'Administrador'];
        this.userChartData = groups.map((group) => {
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

  private loadApplicationsByStatus(): void {
    this.metricsService.getApplicationsByStatus().subscribe((data: any[]) => {
      const uniqueLabels = Array.from(
        new Set(data.map((d) => `${d.month}/${d.year}`))
      );
      this.applicationChartLabels = uniqueLabels;

      const statuses = ['En Revisión', 'Aprobado', 'Rechazado'];
      this.applicationChartData = statuses.map((status) => {
        return {
          label: status,
          data: uniqueLabels.map((label) => {
            const [month, year] = label.split('/');
            const match = data.find(
              (d) => d.month == month && d.year == year && d.status === status
            );
            return match ? match.totalApplications : 0;
          }),
        };
      });
    });
  }

  private loadLoginsByGroupAndMonth(): void {
    this.metricsService.getLoginsByMonth().subscribe((data: any[]) => {
      const uniqueLabels = Array.from(
        new Set(data.map((d) => `${d.month}/${d.year}`))
      );
      this.loginChartLabels = uniqueLabels;

      const groups = ['Postulante', 'Empleado', 'Administrador'];
      this.loginChartData = groups.map((group) => {
        return {
          label: group,
          data: uniqueLabels.map((label) => {
            const [month, year] = label.split('/');
            const match = data.find(
              (d) => d.month == month && d.year == year && d.group === group
            );
            return match ? match.totalLogins : 0;
          }),
        };
      });
    });
  }
}
