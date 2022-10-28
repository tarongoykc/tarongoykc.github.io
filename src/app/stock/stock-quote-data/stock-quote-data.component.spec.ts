import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockQuoteDataComponent } from './stock-quote-data.component';

describe('StockQuoteDataComponent', () => {
  let component: StockQuoteDataComponent;
  let fixture: ComponentFixture<StockQuoteDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockQuoteDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockQuoteDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
