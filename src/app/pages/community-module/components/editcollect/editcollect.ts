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
  statuses: any[] = [
    { code: 'requested', name: 'Recogida solicitada', icon: 'mail-unread-outline'},
    { code: 'delivered', name: 'Recogida entregada', icon: 'mail-outline'},
    { code: 'received', name: 'Recogida recibida', icon: 'mail-open-outline'}
  ];
  prettyStatusMap = {requested: 'COLLECT:REQUESTED', delivered: 'COLLECT:DELIVERED', received: 'COLLECT:RECEIVED'};
  loadingPieces: boolean = true;
  hasChangedValidation: boolean = false;

  showAvailablePieces: boolean = false;
  get pieceStockAvailable(): boolean {
    let output = false;
    if (this.data.pieces && this.data.pieces.length) {
      this.data.pieces.forEach(itm => {
        if (!output && itm.units!=undefined && itm.stock!=undefined && itm.units == 0 && itm.stock!=0) {
          output = true;
        }
      });
    }

    return output;
  };
  showAvailableMaterials: boolean = false;
  get materialStockAvailable(): boolean {
    let output = false;
    if (this.data.materials && this.data.materials.length) {
      this.data.materials.forEach(itm => {
        if (!output && itm.units!=undefined && itm.units_pending!=undefined && itm.units == 0 && itm.units_pending!=0) {
          output = true;
        }
      });
    }

    return output;
  };

  constructor(private core: CoreService, navParams: NavParams) {
    this.data = navParams.data.data;
    this.fetchPieces();
    if (this.data.pieces.length) this.fetchPiecesRanking();
    this.fetchMaterials();
    if (this.data.materials.length) this.fetchMaterialsRanking();
    this.performAutoActions();
  }

  performAutoActions() {
    if (this.data.status_code == this.prettyStatusMap.requested && !this.data.admin) {
      this.data.status_code = this.prettyStatusMap.delivered;
    } else if (this.data.status_code == this.prettyStatusMap.delivered) {
      this.data.status_code = this.prettyStatusMap.received;
    }
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

  fetchPieces(cb: Function = null, page=1, autoAddUnits=null) {
    if (autoAddUnits===null) autoAddUnits = (this.data.pieces.length || this.data.id)?false:true;
    this.loadingPieces = true;
    this.core.api.getCommunityPiecesByUser(this.data.community, page, this.data.user).subscribe((Res:any) => {
      Res.data.forEach(itm => {
        let foundLocal = false;
        this.data.pieces.forEach(itmlocal => {
          if (itm.uuid==itmlocal.uuid) {
            foundLocal = true;
            itmlocal.validated_at = itm.validated_at;
            itmlocal.picture = itm.picture;
          }
        });
        if (!foundLocal) {
          itm.user = null;
          itm.uuid_community = this.data.community;
          this.core.api.getRankingByUserPiece(this.data.community_alias, this.data.user, itm.uuid).subscribe(ResRanking => {
            itm.user = (<any>ResRanking).data[0];
            this.data.pieces.push({
              picture:itm.picture,
              name:itm.name,
              uuid:itm.uuid,
              validated_at:itm.validated_at,
              units_manufactured:itm.user.units_manufactured,
              units_collected:itm.user.units_collected,
              units:(autoAddUnits)?itm.user.stock:0,
              stock:itm.user.stock
            });
          }, err => this.core.errorToast(null, err));
        }
      });
      // this.pieces.push(...Res.data);
      if (Res.current_page!=Res.last_page) {
        this.fetchPieces(cb, parseInt(Res.current_page)+1, autoAddUnits);
      } else {
        this.loadingPieces = false;
        if (cb) cb();
      }
    }, err => {
      this.loadingPieces = false;
      this.core.errorToast(null, err)
    });
  }

  fetchMaterialsRanking() {
    this.data.materials.forEach(itm => {
      // this.core.api.getMaterialUnits(this.data.community_alias, itm.uuid, (this.data.admin)?this.data.user:'').subscribe(ResRanking => {
      this.core.api.getRankingByUserPiece(this.data.community_alias, this.data.user, itm.uuid).subscribe(ResRanking => {
        itm.units_request = (<any>ResRanking).data[0].units_request;
        itm.units_delivered = (<any>ResRanking).data[0].units_delivered;
        itm.units_pending = (<any>ResRanking).data[0].units_request-(<any>ResRanking).data[0].units_delivered;
      }, err => this.core.errorToast(null, err));
    });
  }

  fetchMaterials(cb: Function = null, page=1, autoAddUnits=null) {
    if (autoAddUnits===null) autoAddUnits = (this.data.materials.length || this.data.id)?false:true;
    this.loadingPieces = true;
    this.core.api.getCommunityPieces(this.data.community, 'material', page).subscribe((Res:any) => {
      Res.data.forEach(itm => {
        let foundLocal = false;
        this.data.materials.forEach(itmlocal => {
          if (itm.uuid==itmlocal.uuid) {
            foundLocal = true;
            itmlocal.picture = itm.picture;
          }
        });
        if (!foundLocal) {
          itm.user = null;
          itm.uuid_community = this.data.community;
          // this.core.api.getMaterialUnits(this.data.community_alias, itm.uuid, (this.data.admin)?this.data.user:'').subscribe(ResRanking => {
          this.core.api.getRankingByUserPiece(this.data.community_alias, this.data.user, itm.uuid).subscribe(ResRanking => {
            itm.user = (<any>ResRanking).data[0];
            this.data.materials.push({
              picture:itm.picture,
              name:itm.name,
              uuid:itm.uuid,
              units_request:itm.user.units_request,
              units_delivered:itm.user.units_delivered,
              units_pending:itm.user.units_request-itm.user.units_delivered,

              units:(autoAddUnits)?(itm.user.units_request-itm.user.units_delivered):0
            });
          }, err => this.core.errorToast(null, err));
        }
      });

      if (Res.current_page!=Res.last_page) {
        this.fetchMaterials(cb, parseInt(Res.current_page)+1, autoAddUnits);
      } else {
        this.loadingPieces = false;
        if (cb) cb();
      }
    }, err => {
      this.loadingPieces = false;
      this.core.errorToast(null, err)
    });
  }

  toggleValidation(piece) {
    this.core.createLoading().then(loading => {
      const willBeValidated = (!piece.validated_at)?true:false;
      this.core.api.setPieceValidation(this.data.user, piece.uuid, willBeValidated).subscribe((Res:any) => {
        this.hasChangedValidation = true;
        piece.validated_at = willBeValidated;
        this.core.successToast(loading, Res.message);
      }, err => this.core.errorToast(loading, err));
    });
  }

  validate(cbOk: Function=null) {
    // if (this.newStock<this.getMin) {
    //   this.newStock = this.getMin;
    //   this.core.errorToast(null, 'La cantidad introducida no es válida (el stock actual no puede ser inferior a cero), por lo que se ha establecido al mínimo número posible');
    // } else
    if (this.hasChangedValidation) {
      this.core.alertCtrl.create({
        message: 'Ha modificado la validación de una pieza. ¿Está seguro de que quiere solicitar una recogida?',
        buttons: [
          {text: 'No', role: 'cancel'},
          {text: 'Sí', handler: () => { if (cbOk) cbOk(); }},
        ]
      }).then(a => a.present());
    } else {
      cbOk&&cbOk();
    }
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
