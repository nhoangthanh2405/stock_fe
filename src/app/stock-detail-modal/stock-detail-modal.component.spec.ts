import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDetailModalComponent } from './stock-detail-modal.component';

describe('StockDetailModalComponent', () => {
  let component: StockDetailModalComponent;
  let fixture: ComponentFixture<StockDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockDetailModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
