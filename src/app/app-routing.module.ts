import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockSentimentInfoComponent } from './stock/stock-sentiment-info/stock-sentiment-info.component';
import { StockBaseComponent } from './stock/stock-base/stock-base.component';

const routes: Routes = [
  { path: '', component: StockBaseComponent },
  { path: 'sentiment/:symbol', component: StockSentimentInfoComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
