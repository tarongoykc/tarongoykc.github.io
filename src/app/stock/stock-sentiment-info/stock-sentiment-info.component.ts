import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FinnhubService } from 'src/app/services/finnhub.service';

class MonthSentiment {
  month!: number;
  change?: number;
  mspr?: number;
  class: string = "trend-cell na-change";
  arrow: string = "N/A";
  noData: boolean = true;

  constructor(month: number) {
    this.month = month;
  }
}

@Component({
  selector: 'app-stock-sentiment-info',
  templateUrl: './stock-sentiment-info.component.html',
  styleUrls: ['./stock-sentiment-info.component.css']
})
export class StockSentimentInfoComponent implements OnInit, OnDestroy {

  protected stockSymbol: string = "Loading Symbol";
  protected stockName: string = "Loading Name";
  protected currentMonth!: Date; //current month
  protected prevMonth!: Date;   //month before current month
  protected lastMonth!: Date;   //2 months before current month
  protected loadingName: boolean = false;
  protected monthData: MonthSentiment[] = [];

  private subscriptions: Array<Subscription> = [];

  constructor(
    private finnhub: FinnhubService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  //public methods
  ngOnInit(): void {
    this.loadingName = true;
    this.subscriptions.push(this.route.paramMap
      .subscribe({
        next: params => {
          //get the symbol on the route
          this.stockSymbol = (params.get("symbol") || "N/A");

          if (this.stockSymbol !== "N/A") {
            this.loadName();
          }
          else {
            this.stockName = "N/A";
            this.loadingName = false;
          }
        }
      }));
    
    this.findMonths(new Date());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  goBack(): void {
    this.router.navigate(['']);
  }

  //private methods
  private loadName(): void {
    this.subscriptions.push(this.finnhub.getSymbolLookup(this.stockSymbol)
      .subscribe({
        next: res => {
          //gets the first result and checks if it's equal to the given symbol
          if (res.count > 0 && res.result[0].symbol == this.stockSymbol) {
            this.stockName = res.result[0].description;
            this.loadingName = false;
          }
          else {
            this.stockName = "N/A"
            this.loadingName = false;
          }
        }
      }));
  }

  private getSentimentData(lowerDateBound: Date, upperDateBound: Date) {
    this.subscriptions.push(this.finnhub.getInsiderSentiment(this.stockSymbol, lowerDateBound, upperDateBound)
      .subscribe({
        next: res => {
          res.data.forEach(d => {
            this.monthData.forEach((m: MonthSentiment) => {
              if (m.month === d.month) {
                m.change = d.change;
                m.mspr = d.mspr;
                m.class = m.change == 0 ? "trend-cell na-change" : m.change > 0 ? "trend-cell positive-change" : "trend-cell negative-change";
                m.arrow = m.change == 0 ? "N/A" : m.change > 0 ? "🢅" : "🢆";
                m.noData = false;
              }
            });
          });
        },
        error: err => {
          console.log(err);
        }
      }));
  }

  private findMonths(date: Date): void {
    date.setDate(1);
    this.currentMonth = new Date(date);
    this.monthData.push(new MonthSentiment(this.currentMonth.getMonth()));
    
    // if (date.getMonth() == 1) {
    //   date.setMonth(12);
    //   date.setFullYear(date.getFullYear() - 1);
    // }
    // else {
    //   date.setMonth(date.getMonth() - 1);
    // }
    date.setMonth(date.getMonth() - 1);
    this.prevMonth = new Date(date);
    this.monthData.push(new MonthSentiment(this.prevMonth.getMonth()));

    // if (date.getMonth() == 1) {
    //   date.setMonth(12);
    //   date.setFullYear(date.getFullYear() - 1);
    // }
    // else {
    //   date.setMonth(date.getMonth() - 1);
    // }
    date.setMonth(date.getMonth() - 1);
    this.lastMonth = new Date(date);
    this.monthData.push(new MonthSentiment(this.lastMonth.getMonth()));

    this.getSentimentData(this.lastMonth, new Date());
  }

}
