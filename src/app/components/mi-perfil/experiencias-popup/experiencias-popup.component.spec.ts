import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciasPopupComponent } from './experiencias-popup.component';

describe('ExperienciasPopupComponent', () => {
  let component: ExperienciasPopupComponent;
  let fixture: ComponentFixture<ExperienciasPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienciasPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExperienciasPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
