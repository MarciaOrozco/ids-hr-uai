import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvidoClaveCambioComponent } from './olvido-clave-cambio.component';

describe('OlvidoClaveCambioComponent', () => {
  let component: OlvidoClaveCambioComponent;
  let fixture: ComponentFixture<OlvidoClaveCambioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OlvidoClaveCambioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OlvidoClaveCambioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
