import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient()]
};

export const appSettings = {
  apiBaseUrl: 'https://sistemas-de-vendas-gocoffee-backend.onrender.com',
};
