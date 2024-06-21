import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajoItemComponent } from './trabajo-item.component';

describe('TrabajoItemComponent', () => {
  let component: TrabajoItemComponent;
  let fixture: ComponentFixture<TrabajoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrabajoItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrabajoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
