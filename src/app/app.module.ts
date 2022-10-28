import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockSelectorComponent } from './stock/stock-selector/stock-selector.component';
import { StockSentimentInfoComponent } from './stock/stock-sentiment-info/stock-sentiment-info.component';
import { StockQuoteDataComponent } from './stock/stock-quote-data/stock-quote-data.component';
import { StockBaseComponent } from './stock/stock-base/stock-base.component';

@NgModule({
  declarations: [
    AppComponent,
    StockSelectorComponent,
    StockSentimentInfoComponent,
    StockQuoteDataComponent,
    StockBaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
