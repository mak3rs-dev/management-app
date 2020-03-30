import { Component } from '@angular/core';
import { CoreService } from 'src/app/providers/core.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
  styleUrls: ['ranking.scss']
})
export class RankingPage {

  data: any = null;

  constructor(public core: CoreService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ionViewDidEnter(): void {
    this.core.createLoading().then(loading => {
      if (this.activatedRoute.snapshot.root.firstChild.firstChild.params.alias) {
        this.core.api.getCommunityRanking(this.activatedRoute.snapshot.root.firstChild.firstChild.params.alias).subscribe(Res => {
          this.data = Res;
          loading.dismiss();
        }, (err) => {
          this.core.errorToast(loading, 'No tienes permiso para acceder a esta información, debes formar parte de la comunidad');
          this.router.navigateByUrl('info');
        });
      } else this.core.errorToast(loading);
    });
  }

}
