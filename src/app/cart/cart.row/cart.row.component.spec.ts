import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartRowComponent } from './cart.row.component';

describe('Cart.RowComponent', () => {
  let component: CartRowComponent;
  let fixture: ComponentFixture<CartRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
