import { Component } from '@angular/core';
import { CoreService } from 'src/app/providers/core.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailPage } from '../../detail.page';

@Component({
  selector: 'page-pieces',
  templateUrl: 'pieces.html',
  styleUrls: ['pieces.scss']
})
export class PiecesPage {

  data: any = null;

  constructor(public core: CoreService, private router: Router) {
  }

  ionViewDidEnter(): void {
    this.refresh();
  }

  public refresh(page: number=1) {
    this.core.createLoading().then(loading => {
      this.core.api.getCommunityPieces(DetailPage.data.alias, page).subscribe((Res:any) => {
        Res.data.forEach(itm => {
          itm.user = null;
          this.core.api.getRankingByUserPiece(DetailPage.data.alias, this.core.auth.user.uuid, itm.uuid).subscribe(ResRanking => {
            itm.user = (<any>ResRanking).data[0];
          }, err=>this.core.errorToast(loading, err));
        });
        this.data = Res;
        loading.dismiss();
      }, err => {
        this.core.errorToast(loading, err);
        this.router.navigateByUrl('/community/'+DetailPage.data.alias+'/info');
      });
    });
  }

}
