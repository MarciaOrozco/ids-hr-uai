import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NombrePopupComponent } from './nombre-popup.component';

describe('NombrePopupComponent', () => {
  let component: NombrePopupComponent;
  let fixture: ComponentFixture<NombrePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NombrePopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NombrePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
