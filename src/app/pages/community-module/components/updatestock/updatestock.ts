import { Component } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { CoreService } from 'src/app/providers/core.service';


@Component({
  selector: 'page-updatestock',
  templateUrl: 'updatestock.html',
  styleUrls: ['updatestock.scss']
})
export class UpdateStockComponentPage {

  data: any = null;
  newStock: number = 0;

  get getMin() {
    return this.data.user.units_collected;
  }
  get getStock() {
    return this.newStock-this.data.user.units_collected;
  }
  get getDiff() {
    return this.newStock-this.data.user.units_manufactured;
  }

  constructor(private core: CoreService, navParams: NavParams) {
    this.data = navParams.data.data;
    if (this.data.user==undefined) {
      this.data.user = {
        units_manufactured: 0,
        units_collected: 0,
        stock: 0
      }
    }
    this.newStock = this.data.user.units_manufactured;
  }

  performDiff(diff:number) {
    if (parseInt(this.newStock.toString())+diff-this.data.user.units_collected>=0) {
      this.newStock = parseInt(this.newStock.toString()) + diff;
    }
  }

  validate(cbOk: Function=null) {
    if (this.newStock<this.getMin) {
      this.newStock = this.getMin;
      this.core.errorToast(null, 'La cantidad introducida no es válida (el stock actual no puede ser inferior a cero), por lo que se ha establecido al mínimo número posible');
    } else cbOk&&cbOk();
  }

  dismiss() {
    this.core.modalCtrl.dismiss();
  }

  save() {
    this.validate(() => {
      this.core.createLoading().then(loading => {
        this.core.api.putNewPieceUnits(this.data.uuid_community, this.data.uuid, this.getDiff).subscribe(_ => {
          loading.dismiss();
          this.dismiss();
        }, err => this.core.errorToast(loading, err));
      });
    });
  }

  public static async Open(data: any, core: CoreService, cbDissmiss: any=null) {
    let modal = await core.modalCtrl.create({
      component: UpdateStockComponentPage,
      componentProps: { data: data }
    });
    if (cbDissmiss) modal.onDidDismiss().then(e => cbDissmiss(e));
    modal.present();
  }

}
