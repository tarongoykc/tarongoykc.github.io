import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Quote } from 'src/app/models/quote';
import { FinnhubService } from 'src/app/services/finnhub.service';

@Component({
  selector: 'app-stock-quote-data',
  templateUrl: './stock-quote-data.component.html',
  styleUrls: ['./stock-quote-data.component.css']
})
export class StockQuoteDataComponent implements OnInit, OnDestroy {

  @Input() stockSymbol: string = "";
  @Output() removeStockEvent: EventEmitter<string> = new EventEmitter<string>();

  protected stockQuote: Quote = {
    c: 0,
    d: 0,
    dp: 0,
    h: 0,
    l: 0,
    o: 0,
    pc: 0,
    t: 0
  };
  protected changeColor: string = "trend-cell na-change";
  protected changeArrow: string = "0";
  protected loadingData: boolean = true;
  protected stockName: string = 'Loading Name';

  private subscriptions: Array<Subscription> = [];

  constructor(
    private finnhub: FinnhubService,
    private router: Router
  ) { }

  //public methods
  ngOnInit(): void {
    this.loadQuoteData();
    this.loadName();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  removeStock(): void {
    this.removeStockEvent.emit(this.stockSymbol);
  }

  openInsiderSentiment(): void {
    console.log("Going to sentiment");
    this.router.navigate(['sentiment', this.stockSymbol]);
  }

  //private methods
  private loadQuoteData(): void {
    this.loadingData = true;
    this.subscriptions.push(this.finnhub.getQuote(this.stockSymbol)
      .subscribe(
        value => {
          this.stockQuote = value;
          this.changeColor = this.stockQuote.dp == 0 ? "trend-cell na-change" : this.stockQuote.dp > 0 ? "trend-cell positive-change" : "trend-cell negative-change";
          this.changeArrow = this.stockQuote.dp == 0 ? "N/A" : this.stockQuote.dp > 0 ? "🢅" : "🢆";
          this.loadingData = false;
        }
      ));
  }

  private loadName(): void {
    this.subscriptions.push(this.finnhub.getSymbolLookup(this.stockSymbol)
      .subscribe(
        res => {
          //gets the first result and checks if it's equal to the given symbol
          if (res.count > 0 && res.result[0].symbol == this.stockSymbol) {
            this.stockName = res.result[0].description;
          }
        }
      ));
  }

}
