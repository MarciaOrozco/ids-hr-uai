import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarEmpleadoModalComponent } from './modificar-empleado-modal.component';

describe('ModificarEmpleadoModalComponent', () => {
  let component: ModificarEmpleadoModalComponent;
  let fixture: ComponentFixture<ModificarEmpleadoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarEmpleadoModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarEmpleadoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
