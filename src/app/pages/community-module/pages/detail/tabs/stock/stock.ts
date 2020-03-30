import { Component } from '@angular/core';
import { CoreService } from 'src/app/providers/core.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'page-stock',
  templateUrl: 'stock.html',
  styleUrls: ['stock.scss']
})
export class StockPage {

  community: any = null;
  data: any = null;

  constructor(public core: CoreService, private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ionViewDidEnter(): void {
    this.core.createLoading().then(loading => {
      if (this.activatedRoute.snapshot.root.firstChild.firstChild.params.alias) {
        this.core.api.getCommunity(this.activatedRoute.snapshot.root.firstChild.firstChild.params.alias).subscribe(community => {
          this.community = community;

          if (this.community.user) {
            this.core.api.getCommunityStock(this.community.uuid).subscribe(Res => {
              this.data = Res;
              loading.dismiss();
            }, () => this.core.errorToast(loading));
          } else {
            this.core.errorToast(loading, 'No tienes permiso para acceder a esta información, debes formar parte de la comunidad');
            this.router.navigateByUrl('info');
          }
        }, () => this.core.errorToast(loading));
      } else this.core.errorToast(loading);
    });
  }

}
