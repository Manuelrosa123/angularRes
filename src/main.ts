import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/routes';
import { baseUrlInterceptor } from './app/interceptors/base-url.interceptor';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { provideArcgisToken } from './app/maps/arcgis-maps.config';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([baseUrlInterceptor, authInterceptor])),
    provideArcgisToken("AAPKf1d8a3d29588492d9bace52de19d0184wrmwNeNa2Nj2Qgn7QkJBDAQwbt4vbGb5sHH_g_v8hN1ep1qpkR2YMTr4qlCR_SNf"),
    provideRouter(APP_ROUTES),
  ],
}).catch((e) => console.log(e));
