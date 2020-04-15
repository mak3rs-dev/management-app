import { Injectable, ApplicationRef } from '@angular/core';
import { CoreService } from './core.service';
import { HttpClient } from '@angular/common/http';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  private updatePepared: boolean = false;
  get updatePending(): boolean { return this.updatePepared; };

  private core: CoreService;
  public initCore = (core: CoreService) => this.core=core;

  updateInterval;
  config = {
    updateIntervalDelay: 1 * 60 * 1000, // 1 minute
    autoUpdateOnInit: false,
    updateModal: null
  };

  constructor(private appRef: ApplicationRef, private swUpdate: SwUpdate) {
    swUpdate.available.subscribe((e) => {
      console.log('UPDATE AVAILABLE, updating... ', e);
      swUpdate.activateUpdate().then(() => {
        console.log('UPDATE PREPARED: ', e);
        this.updatePepared = true;
      })
    });
    this.checkForUpdates(true);
  }

  private checkForUpdates(firstSync = false, cb = null) {
    if (!this.swUpdate.isEnabled) return;
    this.swUpdate.checkForUpdate().then(() => {
      if (firstSync) {
        this.core.appIsStable.subscribe(() => this.startUpdateInterval());
        if (this.config.autoUpdateOnInit) this.update();
      }
      if (cb) cb();
    });

  }

  public startUpdateInterval() {
    this.appRef.isStable.subscribe(() => {
      if (this.config.updateIntervalDelay) {
        if (this.updateInterval) clearInterval(this.updateInterval);
        this.updateInterval = setInterval(() => {
          this.checkForUpdates(false);
        }, this.config.updateIntervalDelay);
      }
    })
  }

  public stopUpdateInterval() {
    clearInterval(this.updateInterval);
  }

  public update(force: boolean = false) {
    if (force || this.updatePepared) {
      this.runUpdate();
    }
  }

  private runUpdate() {
    location.reload();
  }

}
