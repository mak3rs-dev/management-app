import { Component } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { CoreService } from 'src/app/providers/core.service';


@Component({
  selector: 'page-editcollect',
  templateUrl: 'editcollect.html',
  styleUrls: ['editcollect.scss']
})
export class EditcollectComponentPage {

  data: any = null;
  // pieces: any[] = [];
  loadingPieces: boolean = true;

  constructor(private core: CoreService, navParams: NavParams) {
    this.data = navParams.data.data;
    console.log(this.data);
    if (!this.data.pieces.length) this.fetchPieces();
    if (this.data.id) this.fetchPiecesRanking();
  }

  fetchPiecesRanking() {
    this.data.pieces.forEach(itm => {
      this.core.api.getRankingByUserPiece(this.data.community_alias, this.data.user, itm.uuid).subscribe(ResRanking => {
        itm.units_manufactured = (<any>ResRanking).data[0].units_manufactured;
        itm.units_collected = (<any>ResRanking).data[0].units_collected;
        itm.stock = (<any>ResRanking).data[0].stock;
      }, err => this.core.errorToast(null, err));
    });
  }

  fetchPieces(page=1) {
    this.loadingPieces = true;
    this.core.api.getCommunityPieces(this.data.community, page).subscribe((Res:any) => {
      Res.data.forEach(itm => {
        itm.user = null;
        itm.uuid_community = this.data.community;
        this.core.api.getRankingByUserPiece(this.data.community_alias, this.data.user, itm.uuid).subscribe(ResRanking => {
          itm.user = (<any>ResRanking).data[0];
          // Comment next line to not automatically append data
          this.data.pieces.push({
            picture:itm.picture,
            name:itm.name,
            uuid:itm.uuid,
            units_manufactured:itm.user.units_manufactured,
            units_collected:itm.user.units_collected,
            units:itm.user.stock,
            stock:itm.user.stock
          });
        }, err=>{
          this.loadingPieces = false;
          this.core.errorToast(null, err);
        });
      });
      // this.pieces.push(...Res.data);
      if (Res.current_page!=Res.last_page) {
        this.fetchPieces(parseInt(Res.current_page)+1);
      } else this.loadingPieces = false;
    }, err => {
      this.loadingPieces = false;
      this.core.errorToast(null, err)
    });
  }



  validate(cbOk: Function=null) {
    // if (this.newStock<this.getMin) {
    //   this.newStock = this.getMin;
    //   this.core.errorToast(null, 'La cantidad introducida no es válida (el stock actual no puede ser inferior a cero), por lo que se ha establecido al mínimo número posible');
    // } else
    cbOk&&cbOk();
  }

  dismiss() {
    this.core.modalCtrl.dismiss();
  }

  save() {
    this.validate(() => {
      this.core.createLoading().then(loading => {
        let query = (this.data.id) ? this.core.api.updateCollectControl:this.core.api.addCollectControl;
        query(this.data).subscribe((Res:any) => {
          this.core.successToast(loading, Res.message)
          this.dismiss();
        }, err => this.core.errorToast(loading, err));
      });
    });
  }

  public static async Open(data: any, core: CoreService, cbDissmiss: any=null) {
    let modal = await core.modalCtrl.create({
      component: EditcollectComponentPage,
      componentProps: { data: data }
    });
    if (cbDissmiss) modal.onDidDismiss().then(e => cbDissmiss(e));
    modal.present();
  }

}
