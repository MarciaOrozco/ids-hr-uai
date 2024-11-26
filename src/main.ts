import { bootstrapApplication } from '@angular/platform-browser';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Combinar appConfig y provideCharts en los providers
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), // Mantener los providers existentes en appConfig
    provideCharts(withDefaultRegisterables()), // Agregar configuración de ng2-charts
  ],
}).catch((err) => console.error(err));
