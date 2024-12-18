import { Routes } from '@angular/router';
import { EstudianteLayoutComponent } from './estudiante-layout/estudiante-layout.component';
import { TestComponent } from './test/test.component';
import { MentoresComponent } from './mentores/mentores.component';
import { PlanesComponent } from './planes/planes.component';
import { VerPerfilComponent } from '../../shared/components/ver-perfil/ver-perfil.component';
import { VerPerfilMentorComponent} from "./mentores/ver-perfil-mentor/ver-perfil-mentor.component";
import { ActualizarPerfilComponent } from '../../shared/components/actualizar-perfil/actualizar-perfil.component';

export const estudianteRoutes: Routes = [

    {path: '', redirectTo: 'test', pathMatch: 'full'},

    {
        path: '',
        component: EstudianteLayoutComponent,
        children: [
          { path: 'test', component: TestComponent },
          { path: 'mentores', component: MentoresComponent },
          { path: 'planes', component: PlanesComponent },
          { path: 'perfil', component: VerPerfilComponent },
          { path: 'perfil/actualizar', component: ActualizarPerfilComponent },
          { path: 'ver-perfil-mentor/:id', component: VerPerfilMentorComponent },
        ]
      }
];
