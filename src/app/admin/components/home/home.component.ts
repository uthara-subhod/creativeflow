import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  users=0
  trs =0
  works =0
  tableData:any[]=[]
  public chartData: any[] = [];
  public chartLabels: any[] = [];
  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: string[] = [];
  public pieChartData!: ChartData<'pie', number[], string | string[]>
  public pieChartLegend = true;

  public pieChartData2!:ChartData<'pie', number[], string | string[]>
  constructor(private admin: AdminService) {}

  ngOnInit(): void {
    this.admin.dashboard().subscribe({
      next: (res) => {
        const data = res.trs;
        this.chartData = [
          {
            data: data.map((tr) => tr.amount),
            label: 'Amount'
          }
        ];
        this.chartLabels = data.map((tr) => new Date(tr.createdAt).toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }));
        this.pieChartLabels = res.artfields.map((a)=>a._id)
        this.pieChartData = {
          labels:this.pieChartLabels,
          datasets:[
              {
                data:res.artfields.map((a)=>a.count)
              }
            ]

        }
        this.pieChartData2 = {
          labels:res.genres.map((a)=>a._id),
          datasets:[
            {
              data:res.genres.map((a)=>a.count)
            }
          ]
        }
        this.trs = res.trs.length
        this.tableData =res.trs
        this.users=res.users.length
        this.works= res.artfields.reduce((sum,a)=>sum+a.count,0) +res.genres.reduce((sum,a)=>sum+a.count,0)
      }
    });
  }
}
