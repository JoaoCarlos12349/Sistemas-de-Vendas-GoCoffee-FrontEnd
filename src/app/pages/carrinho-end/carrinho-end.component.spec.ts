import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhoEndComponent } from './carrinho-end.component';

describe('CarrinhoEndComponent', () => {
  let component: CarrinhoEndComponent;
  let fixture: ComponentFixture<CarrinhoEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrinhoEndComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarrinhoEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
