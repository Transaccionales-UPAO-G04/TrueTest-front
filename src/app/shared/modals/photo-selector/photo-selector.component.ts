import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-photo-selector',
  standalone: true,
  templateUrl: './photo-selector.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./photo-selector.component.css']
})
export class PhotoSelectorComponent {
  photos: string[] = [
    '/perfiles/profile1.png',
    'perfiles/profile2.png',
    'perfiles/profile3.png',
    'perfiles/profile4.png',
    'perfiles/profile5.png',
    'perfiles/profile6.png',
  ]; // Agrega las rutas de las imágenes disponibles

  private dialogRef = inject(MatDialogRef);

  select(photo: string): void {
    this.dialogRef.close(photo); // Cierra el modal y devuelve la foto seleccionada
  }

  cancel(): void {
    this.dialogRef.close(); // Cierra el modal sin devolver nada
  }
}
