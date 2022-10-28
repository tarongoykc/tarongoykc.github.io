import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockBaseComponent } from './stock-base.component';

describe('StockBaseComponent', () => {
  let component: StockBaseComponent;
  let fixture: ComponentFixture<StockBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
