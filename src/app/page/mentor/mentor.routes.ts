import { Routes } from "@angular/router";
import { MentorLayoutComponent } from "./mentor-layout/mentor-layout.component";
import { VerPerfilComponent } from "../../shared/components/ver-perfil/ver-perfil.component";
import { ResenasComponent } from "./resenas/resenas.component";
import { HorariosComponent } from "./horarios/horarios.component";


export const mentorRoutes: Routes = [

    {path: '', redirectTo: 'perfil', pathMatch: 'full'},

    {
        path: '',
        component: MentorLayoutComponent,
        children: [
            { path: '', redirectTo: 'perfil', pathMatch: 'full' },
            { path: 'perfil', component: VerPerfilComponent },
            { path: 'horarios', component: HorariosComponent },
            { path: 'resenas', component: ResenasComponent },
        ]
      }
];