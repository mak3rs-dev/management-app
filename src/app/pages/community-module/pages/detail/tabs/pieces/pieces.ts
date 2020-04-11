import { Component } from '@angular/core';
import { CoreService } from 'src/app/providers/core.service';
import { Router } from '@angular/router';
import { DetailPage } from '../../detail.page';
import { UpdateStockComponentPage } from 'src/app/pages/community-module/components/updatestock/updatestock';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'page-pieces',
  templateUrl: 'pieces.html',
  styleUrls: ['pieces.scss']
})
export class PiecesPage {

  dataPieces: any = null;
  dataMaterials: any = null;

  get adminPermission(): boolean {
    return (this.core.auth.user&&this.core.auth.user.role_name=='USER:ADMIN')||DetailPage.isMakerAdmin||false;
  }

  constructor(public core: CoreService, private router: Router, private alertCtrl: AlertController) {
  }

  ionViewDidEnter(): void {
    this.refresh();
  }

  public refresh(page: number=1) {
    this.core.createLoading().then(loading => {
      this.core.api.getCommunityPiecesByUser(DetailPage.data.uuid, page, this.core.auth.user.uuid).subscribe((Res:any) => {
        Res.data.forEach(itm => {
          itm.user = null;
          itm.uuid_community = DetailPage.data.uuid;
          this.core.api.getRankingByUserPiece(DetailPage.data.alias, this.core.auth.user.uuid, itm.uuid).subscribe(ResRanking => {
            itm.user = (<any>ResRanking).data[0];
          }, err=>this.core.errorToast(loading, err));
        });
        this.dataPieces = Res;
        loading.dismiss();
      }, err => {
        this.core.errorToast(loading, err);
        this.router.navigateByUrl('/community/'+DetailPage.data.alias+'/info');
      });
    });
    this.core.createLoading().then(loading => {
      this.core.api.getCommunityPieces(DetailPage.data.uuid, 'material', page).subscribe((Res:any) => {
        Res.data.forEach(itm => {
          itm.user = null;
          itm.uuid_community = DetailPage.data.uuid;
          this.core.api.getMaterialUnits(DetailPage.data.alias, itm.uuid, (this.adminPermission?this.core.auth.user.uuid:'')).subscribe(ResRanking => {
            itm.user = (<any>ResRanking).data[0];
          }, err=>this.core.errorToast(loading, err));
        });
        this.dataMaterials = Res;
        loading.dismiss();
      }, err => {
        this.core.errorToast(loading, err);
        this.router.navigateByUrl('/community/'+DetailPage.data.alias+'/info');
      });
    });
  }

  public clickMaterial(p) {
    let min: number = 0;
    if (p.user) min = parseInt(p.user.units_delivered) - parseInt(p.user.units);
    this.alertCtrl.create({
      message: 'Introduzca la cantidad a solicitar',
      inputs: [ {type: 'number', name: 'units', min: min, value: 0 } ],
      buttons: [
        'Cancelar',
        { text: 'Solicitar', handler: data => this.core.createLoading().then(loading =>
          this.core.api.putNewMaterialUnits(DetailPage.data.uuid, p.uuid, parseInt(data.units)).subscribe((Res:any) => {
            this.core.successToast(loading, Res.message);
            this.refresh();
          }, err => this.core.errorToast(loading, err))
        )}
      ]
    }).then(a=>a.present());
  }

  public clickPiece = (p) => this.changeStock(p);
  changeStock = (p) => UpdateStockComponentPage.Open(p, this.core, () => this.refresh());

}
