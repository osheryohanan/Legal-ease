import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";
import { Imeeting, CalendarEvent } from 'src/app/interfaces/meeting.interface';
import { Subscription } from 'rxjs';
import { LawyerService } from 'src/app/services/api/lawyer.service';
import swal from "sweetalert2";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public canvas: any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  public today = new Date();

  subs: Subscription[] = [];
  meetings: Imeeting[] = []
  calendar: any;
  events: CalendarEvent[] = [];
  nextMeeting: Date | string = "";
  TotalClient:  number[] = [];
  TotalMoney: [] = [];

  constructor(
    private lawyerservice: LawyerService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  private drawClientChart(){
    this.canvas = document.getElementById("chartLineClient");
    this.ctx = this.canvas.getContext("2d");

    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(233,32,16,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(233,32,16,0.0)");
    gradientStroke.addColorStop(0, "rgba(233,32,16,0)"); //red colors

    var chart_labels = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ];
    var data = {
      labels: chart_labels,
      datasets: [
        {
          label: `Total client of ${new Date().getFullYear()}`,
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#ec250d",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#ec250d",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#ec250d",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.TotalClient
        }
      ]
    };

    var myChart = new Chart(this.ctx, {
      type: "line",
      data: data,
      options: this.getChartConfig('red')
    });
  }
  private drawMoneyChart(){
    this.canvas = document.getElementById("chartLineMoney");
    this.ctx = this.canvas.getContext("2d");

    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
    gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
    gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors

    var chart_labels = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ];
    var data = {
      labels: chart_labels,
      datasets: [
        {
          label: `Total money of ${new Date().getFullYear()}`,
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#00d6b4",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#00d6b4",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#00d6b4",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.TotalMoney
        }
      ]
    };

    var myChart = new Chart(this.ctx, {
      type: "line",
      data: data,
      options: this.getChartConfig('green')
    });
  }
  private drawChart(){
    this.drawClientChart();
    this.drawMoneyChart();
  }

  loadData() {
    this.subs.push(this.lawyerservice.getMeetingsForLawyer().subscribe(
      (x: any) => {
        this.events = x.calendarEvent;
        this.meetings = x.meetings;
        this.nextMeeting = x.nextMeeting;
        // this.calendar.addEventSource(this.events);
      },
      err => {

        swal.fire({
          title: 'Oops...',
          text: 'Something went wrong!',

        })
      }

    ));
    this.subs.push(this.lawyerservice.getStatsPricesForLawyer().subscribe(
      (x: any) => {
        this.TotalClient = x.totalC;
        this.TotalMoney = x.totalA;
        this.drawChart()
      },
      err => {

        swal.fire({
          title: 'Oops...',
          text: 'Something went wrong!',

        })
      }

    ));
  }
  paymentConfirmation(_paymentDetails): number {
    if (!_paymentDetails) return 0;
    return 1;

    //Complete here with de payment information of the סליקה
  }
  updateStatus(id, status) {
    this.subs.push(this.lawyerservice.updateMeetingsStatus(id, status).subscribe(
      x => this.loadData()
    ))
  }
  calculePrice(lawyer, hour: []): string {
    if (!lawyer.priceHourly)
      return this.translate.instant('LAWYER.DASHBOARD.FEESALERT')
    let price: number = (hour.length) * (lawyer.priceHourly / 2);

    return `&#8362;  ${price}`;
  }
  TotalPrice(): string {
    if (this.meetings.length == 0) return `&#8362;  ${0}`;
    let priceHourly = this.meetings[0].lawyerID[0].priceHourly | 0;
    if (priceHourly == 0) return this.translate.instant('LAWYER.DASHBOARD.FEESALERT');
    let total: number = 0;
    this.meetings.forEach((e) => {
      let hour = e.hour;
      total += ((hour.length) * (priceHourly / 2));
    })
    return `&#8362;  ${total}`;
  }
  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }
  private getChartConfig(color: string): any {
    var gradientChartOptionsConfigurationWithTooltipBlue: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#2380f7"
            }
          }
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#2380f7"
            }
          }
        ]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipPurple: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }
        ]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipRed: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(233,32,16,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }
        ]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipOrange: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 50,
              suggestedMax: 110,
              padding: 20,
              fontColor: "#ff8a76"
            }
          }
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(220,53,69,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#ff8a76"
            }
          }
        ]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipGreen: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 50,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(0,242,195,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ]
      }
    };
    switch (color) {
      case 'blue':
        return gradientChartOptionsConfigurationWithTooltipBlue;
      case 'purple':
        return gradientChartOptionsConfigurationWithTooltipPurple;
      case 'green':
        return gradientChartOptionsConfigurationWithTooltipGreen;
      case 'red':
        return gradientChartOptionsConfigurationWithTooltipRed;
      case 'orange':
        return gradientChartOptionsConfigurationWithTooltipOrange;
      default:
        return gradientChartOptionsConfigurationWithTooltipRed;
    }
  }
  private getGradientBarChartConfiguration() {
    var gradientBarChartConfiguration: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 120,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ],

        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ]
      }
    };
    return gradientBarChartConfiguration;
  }
}
