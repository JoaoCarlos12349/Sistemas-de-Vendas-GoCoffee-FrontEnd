import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpedidosComponent } from './rpedidos.component';

describe('RpedidosComponent', () => {
  let component: RpedidosComponent;
  let fixture: ComponentFixture<RpedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RpedidosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RpedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
