// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { TestService } from './../src/app/page/services/test.service';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()), // Configura HttpClient
    provideRouter(routes),
    // No necesitas incluir TestService aquí porque ya tiene providedIn: 'root'
  ]
}).catch(err => console.error(err));