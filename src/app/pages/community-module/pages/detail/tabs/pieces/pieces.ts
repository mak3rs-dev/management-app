import { Component } from '@angular/core';
import { CoreService } from 'src/app/providers/core.service';
import { Router } from '@angular/router';
import { DetailPage } from '../../detail.page';
import { UpdateStockComponentPage } from 'src/app/pages/community-module/components/updatestock/updatestock';
import { AlertController } from '@ionic/angular';
import { EditcollectComponentPage } from 'src/app/pages/community-module/components/editcollect/editcollect';

@Component({
  selector: 'page-pieces',
  templateUrl: 'pieces.html',
  styleUrls: ['pieces.scss']
})
export class PiecesPage {

  collect: any = null;
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
    this.core.api.getCollectControl(DetailPage.data.alias, null, 'COLLECT:REQUESTED').subscribe((res:any) => {
      if (res.data && res.data[0]) this.collect = res.data[0];
    }, err => this.core.errorToast(null, err));
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

  editCollect(collect) {
    collect.pieces.forEach(p => {
      p.uuid = p.piece.uuid;
      p.picture = p.piece.picture;
      p.name = p.piece.name;
    });
    collect.materials.forEach(p => {
      p.name = p.material_request.piece.name;
      p.uuid = p.material_request.piece.uuid;
      p.picture = p.material_request.piece.picture;
      p.units = p.units_delivered;
    });
    collect.admin = false;
    collect.community = DetailPage.data.uuid;
    collect.community_alias = DetailPage.data.alias;
    collect.collect = collect.id;
    // collect.user = this.core.auth.user.uuid;
    collect.user = collect.user_uuid;
    collect.address = collect.collect_address;
    collect.address_description = collect.collect_address_description;
    collect.location = collect.collect_location;
    collect.province = collect.collect_province;
    collect.state = collect.collect_state;
    collect.country = collect.collect_country;
    collect.cp = collect.collect_cp;

    EditcollectComponentPage.Open(collect, this.core, () =>  this.refresh());
  }

}
