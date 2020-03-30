import { Component } from '@angular/core';
import { CoreService } from 'src/app/providers/core.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
  styleUrls: ['info.scss']
})
export class InfoPage {

  data: any = null;

  constructor(public core: CoreService, private activatedRoute: ActivatedRoute) {
  }

  ionViewDidEnter(): void {
    this.core.createLoading().then(loading => {
      let handleErr = () => this.core.errorToast(loading);

      if (this.activatedRoute.snapshot.root.firstChild.firstChild.params.alias) {
        this.core.api.getCommunity(this.activatedRoute.snapshot.root.firstChild.firstChild.params.alias).subscribe(Res => {
          this.data = Res;
          loading.dismiss();
        }, handleErr);
      } else handleErr();
    });
  }



}
