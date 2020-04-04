import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/providers/core.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-community-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public static data: any = null;

  get adminPermission(): boolean {
    return (this.core.auth.user&&this.core.auth.user.role_name=='USER:ADMIN')||(DetailPage.data && DetailPage.data.user_admin)||false;
  }
  get data():any {
    return DetailPage.data;
  }

  constructor(public core: CoreService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.core.createLoading().then(loading => {
      let handleErr = () => this.core.errorToast(loading, 'La comunidad seleccionada no es válida').then(()=> {
        this.core.navCtrl.navigateRoot('/community');
      });

      if (this.activatedRoute.snapshot.params.alias) {
        this.core.api.getCommunity(this.activatedRoute.snapshot.params.alias).subscribe(Res => {
          DetailPage.data = Res;
          loading.dismiss();
        }, handleErr);
      } else handleErr();
    });
  }

  join() {
    this.core.createLoading().then(loading => {
      this.core.api.joinCommunity(DetailPage.data.uuid).subscribe(_ => {
        this.core.successToast(loading, 'Te has unido a la comunidad correctamente');
        this.refresh();
      }, err => this.core.errorToast(loading, err.error, 3000));
    });
  }

}
