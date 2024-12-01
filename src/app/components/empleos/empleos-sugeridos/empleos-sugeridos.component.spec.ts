import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleosSugeridosComponent } from './empleos-sugeridos.component';

describe('EmpleosSugeridosComponent', () => {
  let component: EmpleosSugeridosComponent;
  let fixture: ComponentFixture<EmpleosSugeridosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleosSugeridosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleosSugeridosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
