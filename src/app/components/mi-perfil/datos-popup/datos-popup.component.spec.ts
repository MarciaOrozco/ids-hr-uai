import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPopupComponent } from './datos-popup.component';

describe('DatosPopupComponent', () => {
  let component: DatosPopupComponent;
  let fixture: ComponentFixture<DatosPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
