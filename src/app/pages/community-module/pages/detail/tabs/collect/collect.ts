import { Component, ViewChild, ElementRef } from '@angular/core';
import { CoreService } from 'src/app/providers/core.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DetailPage } from '../../detail.page';
import { EditcollectComponentPage } from 'src/app/pages/community-module/components/editcollect/editcollect';

@Component({
  selector: 'page-collect',
  templateUrl: 'collect.html',
  styleUrls: ['collect.scss']
})
export class CollectPage {

  @ViewChild('downloadLink', {static:true}) private downloadLink: ElementRef;

  get adminPermission(): boolean {
    return (this.core.auth.user&&this.core.auth.user.role_name=='USER:ADMIN')||DetailPage.isMakerAdmin||false;
  }
  data: any = null;
  query: 'COLLECT:REQUESTED'|'COLLECT:DELIVERED'|'COLLECT:RECEIVED' = null;
  queries: any[] = [
    { code: 'requested', name: 'Recogidas solicitadas', icon: 'mail-unread-outline'},
    { code: 'delivered', name: 'Recogidas entregadas', icon: 'mail-outline'},
    { code: 'received', name: 'Recogidas recibidas', icon: 'mail-open-outline'}
  ];
  prettyStatusMap: any = {requested: 'COLLECT:REQUESTED',delivered: 'COLLECT:DELIVERED',received: 'COLLECT:RECEIVED'};
  loadingMore: boolean = false;
  // showAddresses: boolean = false;
  // communityAlias: string = null;

  constructor(
    public core: CoreService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ionViewDidEnter(): void {
    this.query = null;
    if (this.activatedRoute.snapshot.params.status) {
      const code = this.prettyStatusMap[this.activatedRoute.snapshot.params.status];
      if (code) {
        this.query = code;
      } else {
        this.core.navCtrl.navigateRoot('community/'+DetailPage.data.alias+'/detail/collect');
      }
    }
    if (this.query) this.refresh();
  }

  public refresh(event=null) {
    const doWork = (loading=null) => {
      this.data = null;
      this.core.api.getCollectControl(DetailPage.data.alias, null, this.query).subscribe(Res => {
        this.data = Res;
        if (loading) loading.dismiss();
        if (event != null) event.target.complete();
      }, err => {
        this.core.errorToast(loading, err);
        this.router.navigateByUrl('/community/'+DetailPage.data.alias+'/info');
        if (event != null) event.target.complete();
      });
    }

    if (!event) this.core.createLoading().then(loading => doWork(loading));
    else doWork();
  }

  loadMore() {
    const nextPage = Math.trunc(this.data.data.length / this.data.per_page)+1;
    if (nextPage<=this.data.last_page) {
      this.loadingMore = true;
      this.core.api.getCollectControl(DetailPage.data.alias, null, this.query).subscribe((Res:any) => {
        this.data.data.push(...Res.data);
        this.loadingMore = false;
      }, err => {
        this.loadingMore = false;
        this.core.errorToast(null, err);
      });
    }
  }

  isEditable(collect) {
    if (this.adminPermission) return true;
    if (collect.status_code == 'COLLECT:REQUESTED' && collect.user_uuid == this.core.auth.user.uuid) return true;
    return false;
  }

  editCollect(collect) {
    if (this.isEditable(collect)) {
      collect.pieces.forEach(p => {
        p.uuid = p.piece.uuid;
        p.picture = p.piece.picture;
        p.name = p.piece.name;
      });
      collect.materials.forEach(p => {
        p.uuid = p.material_request.piece.uuid;
        p.units = p.units_delivered;
      });
      collect.admin = this.adminPermission;
      collect.community = DetailPage.data.uuid;
      collect.community_alias = DetailPage.data.alias;
      collect.collect = collect.id;
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

  csvExport() {
    this.core.api.getCollectControlCsv(DetailPage.data.uuid).then((file:any) => {
      const blob = new Blob([
        new Uint8Array([0xEF, 0xBB, 0xBF]), file
      ], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = this.downloadLink.nativeElement;
      link.href = url;
      link.download = 'ranking.csv';
      link.click();

      window.URL.revokeObjectURL(url);
    }).catch(err => this.core.errorToast(null, err));
  }

}
