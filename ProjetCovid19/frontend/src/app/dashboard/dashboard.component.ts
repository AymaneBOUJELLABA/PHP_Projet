import { GraphData } from './../treated-demands/demands';
import { DemandsService } from './../demands.service';
import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';

import { Chart } from 'chart.js'
import { tap, first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  BarChart = [];
  LineChart = [];
  PieChart = [];

  graphData : GraphData;

  constructor(private demandService : DemandsService)
  {    }
  getGraphs()
  {
    this.demandService.getGraphs().subscribe(
      (data) => {
        this.graphData = { notTreated : data['notTreated'],
                            negatif : data['negatif'],
                            positif : data['positif']
                          }
        
      },
      error => {
        console.log(error);
      }
    )
  }
  ngOnInit(): void
  { 
    this.getGraphs();

    this.graphData = this.demandService.getGraphData(); 
    this.showEmpty();
  }
  showEmpty()
  {
    // pie chart:
    this.PieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ["Non traité", "positif", "négatif"],
        datasets: [{
          label: '% des demandes ',
          data: [],

          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',

          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',

          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: "% de chaque type de demande demandes",
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  showGraphs()
  {
    // pie chart:
    this.PieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ["Non traité", "positif", "négatif"],
        datasets: [{
          label: '% des demandes ',
          data: [this.graphData.notTreated, this.graphData.positif, this.graphData.negatif],

          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',

          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',

          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: "% de chaque type de demande demandes",
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
    

}
