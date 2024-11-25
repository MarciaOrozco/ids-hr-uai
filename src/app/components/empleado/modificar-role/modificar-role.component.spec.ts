import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarRoleComponent } from './modificar-role.component';

describe('ModificarRoleComponent', () => {
  let component: ModificarRoleComponent;
  let fixture: ComponentFixture<ModificarRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
