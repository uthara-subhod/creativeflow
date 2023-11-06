import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
// Example sales data
 salesData = {
  labels: ['Product A', 'Product B', 'Product C', 'Product D'],
  datasets: [
    {
      label: 'Last Month',
      data: [100, 150, 80, 200], // Sales for last month
      backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
      borderColor: 'rgba(75, 192, 192, 1)', // Border color
      borderWidth: 1, // Border width
    },
    {
      label: 'This Month',
      data: [120, 110, 90, 220], // Sales for this month
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};
public barChartOptions: any = {
  scaleShowVerticalLines: false,
  responsive: true,
  barThickness:30,
};

public barChartLabels: string[] = this.salesData.labels;
public barChartType: string = 'bar';
public barChartLegend: boolean = true;

public barChartData: any[] = this.salesData.datasets;

}
