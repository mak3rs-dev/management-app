import { Component, ViewChild, ElementRef } from '@angular/core';
import { CoreService } from 'src/app/providers/core.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
  styleUrls: ['ranking.scss']
})
export class RankingPage {

  @ViewChild('downloadLink', {static:true}) private downloadLink: ElementRef;

  get adminPermission(): boolean {
    // TODO: this.data.user_admin is not defined, should I fetch again community info?
    return this.core.auth.user.role_name=='USER:ADMIN'||(this.data && this.data.user_admin)||false;
  }
  data: any = null;
  loadingMore: boolean = false;
  communityAlias: string = null;

  constructor(
    public core: CoreService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ionViewDidEnter(): void {
    this.communityAlias = this.activatedRoute.snapshot.root.firstChild.firstChild.params.alias;
    this.refresh();
  }

  public refresh(event=null) {
    this.core.createLoading().then(loading => {
      if (this.communityAlias) {
        this.core.api.getCommunityRanking(this.communityAlias).subscribe(Res => {
          this.data = Res;
          loading.dismiss();
        }, () => {
          this.core.errorToast(loading, 'No tienes permiso para acceder a esta información, debes formar parte de la comunidad');
          this.router.navigateByUrl('info');
        });
      } else this.core.errorToast(loading);
    });
    if (event && event.target && event.target.complete) event.target.complete();
  }

  loadMore() {
    const nextPage = Math.trunc(this.data.data.lenght / this.data.per_page)+1;
    if (nextPage<=this.data.last_page) {
      this.loadingMore = true;

      this.core.api.getCommunityRanking(this.communityAlias).subscribe((Res:any) => {
        this.data.data.push(...Res.data);
        this.loadingMore = false;
      }, () => {
        this.loadingMore = false;
        this.core.errorToast();
        this.router.navigateByUrl('info');
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
    });
  }

}
