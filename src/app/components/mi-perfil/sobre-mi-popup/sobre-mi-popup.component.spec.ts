import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SobreMiPopupComponent } from './sobre-mi-popup.component';

describe('SobreMiPopupComponent', () => {
  let component: SobreMiPopupComponent;
  let fixture: ComponentFixture<SobreMiPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SobreMiPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SobreMiPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
