import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleoDetalleComponent } from './empleo-detalle.component';

describe('EmpleoDetalleComponent', () => {
  let component: EmpleoDetalleComponent;
  let fixture: ComponentFixture<EmpleoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleoDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpleoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
