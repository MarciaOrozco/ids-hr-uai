import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarCurriculumComponent } from './cargar-curriculum.component';

describe('CargarCurriculumComponent', () => {
  let component: CargarCurriculumComponent;
  let fixture: ComponentFixture<CargarCurriculumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarCurriculumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargarCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
