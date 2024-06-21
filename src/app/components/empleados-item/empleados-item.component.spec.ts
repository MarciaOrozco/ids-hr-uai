import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosItemComponent } from './empleados-item.component';

describe('EmpleadosItemComponent', () => {
  let component: EmpleadosItemComponent;
  let fixture: ComponentFixture<EmpleadosItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadosItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpleadosItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
