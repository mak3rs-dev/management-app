import { Component } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { CoreService } from 'src/app/providers/core.service';


@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html',
  styleUrls: ['privacy.scss']
})
export class PrivacyComponentPage {

  mustConfirm: boolean = true;
  core: CoreService = null;

  constructor(navParams: NavParams) {
    this.mustConfirm = navParams.data.mustConfirm;
    this.core = navParams.data.core;
  }

  dismiss = () => this.core.modalCtrl.dismiss();

  confirm() {
    this.core.createLoading().then(loading => {
      this.core.api.confirmPrivacyPolicy().subscribe((Res:any) => {
        this.core.successToast(loading, Res.message);
        this.dismiss();
      }, err => this.core.errorToast(loading, err));
    });
  }

  decline() {
    this.core.auth.logout(() => {
      this.core.navCtrl.navigateRoot('/').then(()=>this.dismiss());
      this.core.errorToast(null, 'No podrás utilizar la aplicación hasta que aceptes la política de privacidad');
    });
  }

  public static async Open(mustConfirm: boolean, core: CoreService, cbDissmiss: any=null) {
    let modal = await core.modalCtrl.create({
      component: PrivacyComponentPage,
      componentProps: { mustConfirm: mustConfirm, core: core },
      backdropDismiss: false,
      showBackdrop: true
    });
    if (cbDissmiss) modal.onDidDismiss().then(e => cbDissmiss(e));
    modal.present();
  }

}
