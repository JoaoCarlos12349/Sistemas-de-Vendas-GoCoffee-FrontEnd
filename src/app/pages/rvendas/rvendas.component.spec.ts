import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RvendasComponent } from './rvendas.component';

describe('RvendasComponent', () => {
  let component: RvendasComponent;
  let fixture: ComponentFixture<RvendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RvendasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RvendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
