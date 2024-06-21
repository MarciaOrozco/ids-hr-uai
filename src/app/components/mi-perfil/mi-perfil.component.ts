import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.scss',
})
export class MiPerfilComponent {
  fotoEditable: boolean = false;
  datosEditable: boolean = false;
  @ViewChild('fileInput') fileInput!: ElementRef;

  user = {
    img: '',
  };

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
}
