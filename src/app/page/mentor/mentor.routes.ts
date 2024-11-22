import { Routes } from "@angular/router";
import { MentorLayoutComponent } from "./mentor-layout/mentor-layout.component";
import { VerPerfilComponent } from "../../shared/components/ver-perfil/ver-perfil.component";
import { ActualizarPerfilComponent } from "../../shared/components/actualizar-perfil/actualizar-perfil.component";


export const mentorRoutes: Routes = [

    {path: '', redirectTo: 'perfil', pathMatch: 'full'},

    {
        path: '',
        component: MentorLayoutComponent,
        children: [
            { path: 'perfil', component: VerPerfilComponent },
            { path: 'perfil/actualizar', component: ActualizarPerfilComponent },
        ]
      }
];