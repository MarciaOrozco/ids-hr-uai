import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarUsuarioPopupComponent } from './eliminar-usuario-popup.component';

describe('EliminarUsuarioPopupComponent', () => {
  let component: EliminarUsuarioPopupComponent;
  let fixture: ComponentFixture<EliminarUsuarioPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarUsuarioPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarUsuarioPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
