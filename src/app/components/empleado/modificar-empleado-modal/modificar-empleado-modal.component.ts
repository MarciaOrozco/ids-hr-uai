import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CrearEmpleadoService } from '../../../services/crear-empleado.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modificar-empleado-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modificar-empleado-modal.component.html',
  styleUrl: './modificar-empleado-modal.component.scss',
})
export class ModificarEmpleadoModalComponent implements OnInit {
  @Input() empleadoId: any = null;
  public empleado: any = '';
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() confirmModifyEvent = new EventEmitter<number>();

  @ViewChild('fileInput') fileInput!: ElementRef;
  user = {
    img: '',
  };

  modifyEmpleadoForm = new FormGroup({
    email: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
  });

  constructor(private _empleadosService: CrearEmpleadoService) {}

  ngOnInit() {
    if (this.empleadoId !== null) {
      this._empleadosService
        .verEmpleado(this.empleadoId)
        .subscribe((empleado) => {
          this.empleado = empleado;
          this.modifyEmpleadoForm.patchValue({
            email: this.empleado.Persona.Usuario.email,
            nombre: this.empleado.Persona.Nombre,
            apellido: this.empleado.Persona.Apellido,
          });
        });
    }
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  confirmModify() {
    this.confirmModifyEvent.emit(this.empleadoId);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.img = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  modificarEmpleado() {
    const updatedEmpleado = {
      id: this.empleadoId,
      email: this.modifyEmpleadoForm.value.email,
      nombre: this.modifyEmpleadoForm.value.nombre,
      apellido: this.modifyEmpleadoForm.value.apellido,
    };

    this._empleadosService
      .modificarEmpleado(updatedEmpleado)
      .subscribe((res) => {
        this.confirmModifyEvent.emit();
        console.log('Empleado modificado con éxito', res);
      });
  }
}
