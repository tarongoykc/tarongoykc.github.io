import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-base',
  templateUrl: './stock-base.component.html',
  styleUrls: ['./stock-base.component.css']
})
export class StockBaseComponent implements OnInit {

  protected trackedStocks: string[] = [];

  private storageKey: string = 'stockList';

  constructor() { }

  //public methods
  ngOnInit(): void {
    this.trackedStocks = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  newTracker(newStock: string) {
    if (!this.trackedStocks.includes(newStock)) {
      this.trackedStocks.push(newStock);
      localStorage.setItem(this.storageKey, JSON.stringify(this.trackedStocks));
    }
    else{
      console.log(newStock + " already exists");
    }
  }

  removeTracker(removeStock: string) {
    console.log("Removing " + removeStock);
    const index: number = this.trackedStocks.indexOf(removeStock, 0);
    if (index > -1) {
      this.trackedStocks.splice(index, 1);
      localStorage.setItem(this.storageKey, JSON.stringify(this.trackedStocks));
    }
  }

}
