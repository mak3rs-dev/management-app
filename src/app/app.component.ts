import { CoreService } from './providers/core.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Platform, IonToggle } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { menu, MenuInterface } from './providers/config/menu';
import { links } from './providers/config/links';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public links = links;
  public appPages: MenuInterface[] = menu;
  darkModeToggle: IonToggle = undefined;
  @ViewChild('darkModeToggle', {static:true}) set darkModeToggleSet(item: IonToggle) {
    this.darkModeToggle = item;
    this.darkModeToggle.checked = document.documentElement.classList.contains('dark');
  };

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public core: CoreService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    if (localStorage.getItem('darkTheme')==null) {
      console.warn('mediaQuery');
      this.toggleDark(window.matchMedia('(prefers-color-scheme: dark)').matches, false);
    } else {
      this.toggleDark(localStorage.getItem('darkTheme')=='true'?true:false);
    }
    window.matchMedia('(prefers-color-scheme: dark)').addListener((mediaQuery) => this.toggleDark(mediaQuery.matches, false));
  }

  toggleDark(event, save=true) {
    if (typeof event !='boolean') event = event.detail.checked;
    const cssclassAdd = (event) ? 'dark':'light';
    const cssclassRemove = (!event) ? 'dark':'light';
    document.documentElement.classList.add(cssclassAdd);
    document.documentElement.classList.remove(cssclassRemove);
    if (this.darkModeToggle) this.darkModeToggle.checked = event;
    if (save) localStorage.setItem('darkTheme', event);
    console.warn('Switched theme to '+cssclassAdd);
  }

}
