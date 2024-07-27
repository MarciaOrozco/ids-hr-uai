import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiPerfilEmpleadoComponent } from './mi-perfil-empleado.component';

describe('MiPerfilEmpleadoComponent', () => {
  let component: MiPerfilEmpleadoComponent;
  let fixture: ComponentFixture<MiPerfilEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiPerfilEmpleadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiPerfilEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
