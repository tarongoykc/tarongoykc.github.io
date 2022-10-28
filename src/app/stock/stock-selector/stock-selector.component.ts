import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { FinnhubService } from 'src/app/services/finnhub.service';

@Component({
  selector: 'app-stock-selector',
  templateUrl: './stock-selector.component.html',
  styleUrls: ['./stock-selector.component.css']
})
export class StockSelectorComponent implements OnInit, OnDestroy  {
  
  @Output() newStockEvent: EventEmitter<string> = new EventEmitter<string>();
  
  protected trackText: string = "";
  
  private subscriptions: Array<Subscription> = [];

  constructor(
    private finnhub: FinnhubService
  ) { }

  //public methods
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  trackStock(value: string) {
    if (!value) {
      this.trackText = "Please enter a value!"
    }
    else {
      // console.log("Tracking " + value.toUpperCase());
      this.trackText = "Looking up...";
      this.subscriptions.push(this.finnhub.getSymbolLookup(value)
        .subscribe(
          res => {
            console.log(res);
            //gets the first result and checks if it's equal to the given symbol
            if (res.count > 0 && res.result[0].symbol == value.toUpperCase()) {
              this.newStockEvent.emit(value.toUpperCase());
              this.trackText = "Tracking " + value.toUpperCase() + "!";
              (document.getElementById("stockInput") as HTMLInputElement).value = "";
            }
            else {
              this.trackText = "Could not find stock.";
            }
          }
        ));
    }
    
  }

}
