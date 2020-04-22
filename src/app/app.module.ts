import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreService } from './providers/core.service';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { ApiService } from './providers/api.service';
import { AuthService } from './providers/auth/auth.service';

import { CommunityModule } from './pages/community-module/community.module';
import { E404Page } from './pages/404/404.page';
import { RecoverPage } from './pages/recover/recover.page';
import { ComponentsModule } from './components/components.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { VersionService } from './providers/version.service';
import { PipesModule } from './pipes/pipes.module';

const PAGES = [ LoginPage, RecoverPage, RegisterPage, DashboardPage, E404Page ];

@NgModule({
  declarations: [AppComponent, ...PAGES],
  entryComponents: [...PAGES],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    PipesModule,
    FormsModule,
    CommunityModule,
    ComponentsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CoreService,
    ApiService,
    AuthService,
    VersionService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
