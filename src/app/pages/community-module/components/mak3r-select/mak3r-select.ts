import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CoreService } from 'src/app/providers/core.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription } from 'rxjs';

interface ViewConfig {
  community_alias: string;
  multiple?: boolean;
}

@Component({
  selector: 'cmtp-mak3r-select',
  templateUrl: 'mak3r-select.html',
  styleUrls: ['mak3r-select.scss']
})
export class Mak3rSelectComponentPage {

  portsSubscription: Subscription;

  selectedItemsData: any[] = [];
  viewConfig: ViewConfig = { community_alias: '', multiple: false };

  @Input()
  set config(config: ViewConfig) {
    for (let prop in config) {
      if (this.viewConfig[prop] != config[prop]) this.viewConfig[prop] = config[prop];
    }
  }

  @Output() selectedItemsChange = new EventEmitter();
  @Input()
  get selectedItems() {
    return this.selectedItemsData;
  }

  set selectedItems(val) {
    this.selectedItemsData = val;
    this.selectedItemsChange.emit(this.selectedItemsData);
  }


  constructor(private core: CoreService) { }

  searchMak3rs(event: {
    component: IonicSelectableComponent,
    text: string
  }) {

    let text = event.text.trim().toLowerCase();
    event.component.startSearch();
    // Close any running subscription.
    if (this.portsSubscription) {
      this.portsSubscription.unsubscribe();
    }

    if (!text) {
      // Close any running subscription.
      if (this.portsSubscription) {
        this.portsSubscription.unsubscribe();
      }

      event.component.items = [];
      event.component.endSearch();
      return;
    }

    let query = null;
    if (text.startsWith('#')) {
      query = this.core.api.findMak3r(this.viewConfig.community_alias, null, text.substring(1));
    } else {
      query = this.core.api.findMak3r(this.viewConfig.community_alias, text);
    }

    this.portsSubscription = query.subscribe((ports:any) => {
      // Subscription will be closed when unsubscribed manually.
      if (this.portsSubscription.closed) {
        return;
      }

      event.component.items = ports;
      event.component.endSearch();
    }, err => this.core.errorToast(null, err));

  }


}
