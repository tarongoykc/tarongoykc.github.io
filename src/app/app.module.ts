import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StockSelectorComponent } from './stock/stock-selector/stock-selector.component';
import { StockQuoteDataComponent } from './stock/stock-quote-data/stock-quote-data.component';
import { StockSentimentInfoComponent } from './stock/stock-sentiment-info/stock-sentiment-info.component';

import { HttpClientModule } from '@angular/common/http';

import { FinnhubService } from './services/finnhub.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { StockBaseComponent } from './stock/stock-base/stock-base.component';

@NgModule({
  declarations: [
    AppComponent,
    StockSelectorComponent,
    StockQuoteDataComponent,
    StockSentimentInfoComponent,
    StockBaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    HttpClientModule
  ],
  providers: [
    FinnhubService,
    HttpClient,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
