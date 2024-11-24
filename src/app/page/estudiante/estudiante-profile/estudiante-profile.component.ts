import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../core/services/user-profile.service';

@Component({
  selector: 'app-estudiante-profile',
  standalone: true,
  imports: [],
  templateUrl: './estudiante-profile.component.html',
  styleUrl: './estudiante-profile.component.css'
})
export class EstudianteProfileComponent implements OnInit {
  userProfile: any; // Aquí define el modelo adecuado para el perfil

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    // Obtener los datos del perfil del estudiante
    this.userProfileService.getUserProfile(1).subscribe({
      next: (profile) => {
        this.userProfile = profile;
      },
      error: () => {
        console.error('Error al cargar el perfil del estudiante.');
      },
    });
  }
}
