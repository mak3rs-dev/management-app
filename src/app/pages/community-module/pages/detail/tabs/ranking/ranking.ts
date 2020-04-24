import { Component, ViewChild, ElementRef } from '@angular/core';
import { CoreService } from 'src/app/providers/core.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DetailPage } from '../../detail.page';
import { EditcollectComponentPage } from 'src/app/pages/community-module/components/editcollect/editcollect';
import { FiltersComponentPage } from 'src/app/pages/community-module/components/filters/filters';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
  styleUrls: ['ranking.scss']
})
export class RankingPage {

  @ViewChild('downloadLink', {static:true}) private downloadLink: ElementRef;

  get adminPermission(): boolean {
    return (this.core.auth.user&&this.core.auth.user.role_name=='USER:ADMIN')||DetailPage.isMakerAdmin||false;
  }
  data: any = null;
  filterConfig: any = {piece:null, mak3r: []};
  query: 'ranking'|'stock' = 'ranking';
  showEntriesWithActiveCollects: boolean = true;
  showAddresses: boolean = false;
  loadingMore: boolean = false;

  constructor(
    public core: CoreService,
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }

  ionViewDidEnter(): void {
    this.query = <'ranking'|'stock'>this.activatedRoute.snapshot.routeConfig.path;
    if (this.query=='stock') this.showAddresses = true;
    this.refresh();
  }

  private getQueryFunc(page=1): Observable<Object> {
    const query = (this.query=='ranking')?this.core.api.getCommunityRanking:this.core.api.getCommunityStock;
    return query(DetailPage.data.alias, page, this.filterConfig.piece, this.getMak3rFilter());
  }

  public refresh(event=null) {
    const doWork = (loading=null) => {
      this.getQueryFunc().subscribe(Res => {
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

  public loadMore() {
    const nextPage = Math.trunc(this.data.data.length / this.data.per_page)+1;
    if (nextPage<=this.data.last_page) {
      this.loadingMore = true;
      this.getQueryFunc(nextPage).subscribe((Res:any) => {
        this.data.data.push(...Res.data);
        this.loadingMore = false;
      }, err => {
        this.loadingMore = false;
        this.core.errorToast(null, err);
      });
    }
  }

  filter = () => FiltersComponentPage.Open({
    bypieces:true, bymak3r: this.adminPermission,
    community:DetailPage.data.uuid,
    community_alias:DetailPage.data.alias,
    data:this.filterConfig
  },this.core, d=>{
    if (d.data) {
      this.filterConfig=d.data;
      this.refresh();
    }
  });

  createCollect = (user) => EditcollectComponentPage.Open({
    admin: this.adminPermission,

    community: DetailPage.data.uuid,
    community_alias: DetailPage.data.alias,
    user: user.user_uuid,
    user_name: user.user_name,
    mak3r_num: user.mak3r_num,
    status_code: "COLLECT:REQUESTED",

    address: user.user_address,
    address_description: user.user_address_description,
    location: user.user_location,
    province: user.user_province,
    state: user.user_state,
    country: user.user_country,
    cp: user.user_cp,

    pieces: [],
    materials: []
  }, this.core);

  private getMak3rFilter() {
    if (!this.filterConfig.mak3r || !this.filterConfig.mak3r.length) return null;
    let list = [];
    this.filterConfig.mak3r.forEach(itm => list.push(itm.mak3r_num));
    return list;
  }

  csvExport() {
    this.http.post<Blob>(this.core.env.endpoint+'communities/ranking/'+DetailPage.data.alias+'/export', {
      piece: this.filterConfig.piece,
      mak3r_num: this.getMak3rFilter()
    }, {
      responseType: 'blob' as 'json',
      headers:{Authorization: this.core.auth.token}
    }).toPromise().then(file => {
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
