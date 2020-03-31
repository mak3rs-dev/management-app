import { Component } from '@angular/core';
import { CoreService } from 'src/app/providers/core.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
  styleUrls: ['info.scss']
})
export class InfoPage {

  get editPermission(): boolean {
    return (this.core.auth.user&&this.core.auth.user.role_name=='USER:ADMIN')||(this.data && this.data.user_admin)||false;
  }
  editMode: boolean = false;
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

  putCommunity() {
    this.editMode = false;
    this.core.createLoading().then(loading => {
      let handleErr = () => this.core.errorToast(loading).then(()=>this.editMode = true);

      this.core.api.updateCommunity(this.data).subscribe((Res:any) => {
        this.data = Res.community;
        this.core.successToast(loading, Res.message);
      }, handleErr);
    });
  }

}
