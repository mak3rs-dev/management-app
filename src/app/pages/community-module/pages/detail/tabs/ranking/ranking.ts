import { Component, ViewChild, ElementRef } from '@angular/core';
import { CoreService } from 'src/app/providers/core.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DetailPage } from '../../detail.page';

@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
  styleUrls: ['ranking.scss']
})
export class RankingPage {

  @ViewChild('downloadLink', {static:true}) private downloadLink: ElementRef;

  get adminPermission(): boolean {
    return (this.core.auth.user&&this.core.auth.user.role_name=='USER:ADMIN')||(DetailPage.data && DetailPage.data.user_admin)||false;
  }
  data: any = null;
  query: 'ranking'|'stock' = 'ranking';
  showAddresses: boolean = false;
  loadingMore: boolean = false;
  communityAlias: string = null;

  constructor(
    public core: CoreService,
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }

  ionViewDidEnter(): void {
    this.query = <'ranking'|'stock'>this.activatedRoute.snapshot.routeConfig.path;
    if (this.query=='stock') this.showAddresses = true;
    this.communityAlias = DetailPage.data.alias;
    this.refresh();
  }

  public refresh(event=null) {
    const doWork = (loading=null) => {
      const query = (this.query=='ranking')?this.core.api.getCommunityRanking:this.core.api.getCommunityStock;
      query(this.communityAlias).subscribe(Res => {
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
      const query = (this.query=='ranking')?this.core.api.getCommunityRanking:this.core.api.getCommunityStock;
      query(this.communityAlias, nextPage).subscribe((Res:any) => {
        this.data.data.push(...Res.data);
        this.loadingMore = false;
      }, err => {
        this.loadingMore = false;
        this.core.errorToast(null, err);
      });
    }
  }

  csvExport() {
    this.http.get<Blob>(this.core.env.endpoint+'communities/ranking/'+this.communityAlias+'/export', {
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
