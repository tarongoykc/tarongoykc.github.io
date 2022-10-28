import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSentimentInfoComponent } from './stock-sentiment-info.component';

describe('StockSentimentInfoComponent', () => {
  let component: StockSentimentInfoComponent;
  let fixture: ComponentFixture<StockSentimentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockSentimentInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockSentimentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
