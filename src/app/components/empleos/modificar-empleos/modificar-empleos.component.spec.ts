import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarEmpleosComponent } from './modificar-empleos.component';

describe('ModificarEmpleosComponent', () => {
  let component: ModificarEmpleosComponent;
  let fixture: ComponentFixture<ModificarEmpleosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarEmpleosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarEmpleosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
