import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilidadesPopupComponent } from './habilidades-popup.component';

describe('HabilidadesPopupComponent', () => {
  let component: HabilidadesPopupComponent;
  let fixture: ComponentFixture<HabilidadesPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabilidadesPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HabilidadesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
