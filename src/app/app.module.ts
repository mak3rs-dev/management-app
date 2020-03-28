import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreService } from './providers/core.service';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { ApiService } from './providers/api.service';
import { AuthService } from './providers/auth/auth.service';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { CommunityModule } from './pages/community-module/community.module';

const PAGES = [ LoginPage, RegisterPage, DashboardPage ];

@NgModule({
  declarations: [AppComponent, ...PAGES],
  entryComponents: [...PAGES],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CommunityModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CoreService,
    ApiService,
    AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
