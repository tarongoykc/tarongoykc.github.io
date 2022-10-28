import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Quote } from '../models/quote';
import { Sentiment } from '../models/sentiment';
import { Observable } from 'rxjs';
import { SymbolLookup } from '../models/lookup';

@Injectable({
  providedIn: 'root'
})
export class FinnhubService {

  private finnhubURL: string = "https://finnhub.io/api/v1/";
  private finnhubToken: string = "&token=bu4f8kn48v6uehqi3cqg";

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }

  //public methods
  getQuote(symbol: string): Observable<Quote> {
    return this.http.get<Quote>(this.finnhubURL + "/quote?symbol=" + symbol + this.finnhubToken);
  }

  getInsiderSentiment(symbol: string, lowerDate: Date, upperDate: Date): Observable<Sentiment> {
    return this.http.get<Sentiment>(this.finnhubURL + "/stock/insider-sentiment?symbol=" + symbol + 
        "&from=" + this.datePipe.transform(lowerDate, 'YYYY-MM-dd') + 
        "&to=" + this.datePipe.transform(upperDate, 'YYYY-MM-dd') +
        this.finnhubToken);
  }

  getSymbolLookup(symbol: string): Observable<SymbolLookup> {
    return this.http.get<SymbolLookup>(this.finnhubURL + "/search?q=" + symbol + this.finnhubToken);
  }
}
