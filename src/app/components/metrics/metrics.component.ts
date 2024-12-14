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
  public empleoChartData: any[] = [];

  public userChartLabels: string[] = [];
  public applicationChartLabels: string[] = [];
  public loginChartLabels: string[] = [];
  public empleoChartLabels: string[] = [];

  public chartType: any = 'bar';
  public chartTypeEmpleo: any = 'pie';
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

  public sessionDurationChartData: any[] = [];
  public sessionDurationChartLabels: string[] = [];
  public sessionDurationChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          stepSize: 15,
          callback: function (value: any) {
            return Number.isInteger(value) ? value : '';
          },
        },
      },
    },
  };

  public sessionDurationChartLegend = true;
  public sessionDurationChartType: any = 'bar';

  constructor(private metricsService: MetricsService) {}

  ngOnInit(): void {
    this.loadUserRegistrations();
    this.loadApplicationsByStatus();
    this.loadLoginsByGroupAndMonth();
    this.loadSessionDurations();
    this.loadEmpleoMetrics();
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

  private loadSessionDurations(): void {
    this.metricsService.getSessionDurations().subscribe((data: any[]) => {
      const uniqueLabels = Array.from(
        new Set(data.map((d) => `${d.month}/${d.year}`))
      );
      this.sessionDurationChartLabels = uniqueLabels;

      const groups = ['Postulante', 'Empleado', 'Administrador'];
      this.sessionDurationChartData = groups.map((group) => {
        return {
          label: `${group} Session Duration (mins)`,
          data: uniqueLabels.map((label) => {
            const [month, year] = label.split('/');
            const groupData = data.filter(
              (d) => d.month == month && d.year == year && d.group === group
            );

            const avgDuration =
              groupData.reduce((acc, curr) => acc + curr.sessionDuration, 0) /
              (groupData.length || 1);

            return Math.round(avgDuration / 60);
          }),
        };
      });
    });
  }

  private loadEmpleoMetrics(): void {
    this.metricsService.getEmploymentAuditMetrics().subscribe((data: any[]) => {
      console.log(data, 'Data recibida para métricas de empleo');

      this.empleoChartLabels = ['Alta', 'Baja', 'Modificación'];

      const actionTotals = this.empleoChartLabels.map((action) => {
        const total = data
          .filter((d) => d.action === action)
          .reduce((sum, current) => sum + current.totalActions, 0);
        return total;
      });

      this.empleoChartData = [
        {
          data: actionTotals,
          backgroundColor: ['#f7abbb', '#9cccf4', '#fccba3'],
          hoverBackgroundColor: ['#f1a3b4', '#96c5ec', '#fcc69b'],
        },
      ];
    });
  }
}
