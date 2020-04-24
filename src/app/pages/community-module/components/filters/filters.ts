import { Component } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { CoreService } from 'src/app/providers/core.service';


@Component({
  selector: 'page-filters',
  templateUrl: 'filters.html',
  styleUrls: ['filters.scss']
})
export class FiltersComponentPage {

  config: any = null;
  data: any = {};

  constructor(private core: CoreService, navParams: NavParams) {
    this.config = navParams.data.config;
    if (this.config.bypieces) this.loadPieces();
    this.reset();
    if (this.config.data) this.data = this.config.data;
  }

  reset() {
    if (this.config.bypieces) this.data.piece = '';
    if (this.config.bymak3r) this.data.mak3r = [];
  }

  loadPieces(cb: Function = null, page=1, autoAddUnits=null) {
    this.core.api.getCommunityPieces(this.config.community, 'piece', page).subscribe((Res:any) => {
      if (this.config.pieces==undefined) this.config.pieces = [];
      this.config.pieces.push(...Res.data);
      if (Res.current_page!=Res.last_page) {
        this.loadPieces(cb, parseInt(Res.current_page)+1, autoAddUnits);
      } else {
        if (cb) cb();
      }
    }, err => this.core.errorToast(null, err));
  }

  dismiss(data=null) {
    this.core.modalCtrl.dismiss(data);
  }

  save() {
    if (this.config.bypieces && this.data.piece==undefined) this.data.piece = null;
    if (this.config.bymak3r && this.data.mak3r==undefined) this.data.mak3r = [];
    this.dismiss(this.data);
  };

  public static async Open(data: any, core: CoreService, cbDissmiss: any=null) {
    let modal = await core.modalCtrl.create({
      component: FiltersComponentPage,
      componentProps: { config: data }
    });
    if (cbDissmiss) modal.onDidDismiss().then(e => cbDissmiss(e));
    modal.present();
  }

}
