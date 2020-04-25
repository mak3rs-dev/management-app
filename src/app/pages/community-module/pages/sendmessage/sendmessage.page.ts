import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/providers/core.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-community-sendmessage',
  templateUrl: './sendmessage.page.html',
  styleUrls: ['./sendmessage.page.scss'],
})
export class SendMessagePage {

  community_alias: string = null;
  community_data: any = null;
  data: {community:string, users: any[], message: string} = {
    community: '',
    users: [],
    message: ''
  };

  get adminPermission(): boolean {
    return (this.core.auth.user && this.core.auth.user.role_name=='USER:ADMIN') || (this.community_data && this.community_data.admin) || false;
  }

  constructor(public core: CoreService, route: ActivatedRoute) {
    if (!this.core.isLoggedIn) {
      this.core.navCtrl.navigateRoot('/community');
    }
    
    this.community_alias = route.snapshot.params.alias;
  }

  ionViewDidEnter() {
    this.refresh(() => {
      if (!this.adminPermission) {
        this.core.navCtrl.navigateRoot('/community');
      }
    });
  }

  refresh(cb: Function=null) {
    this.core.createLoading().then(loading => {
      let handleErr = () => this.core.errorToast(loading, 'La comunidad seleccionada no es válida').then(()=> {
        if (cb) cb(false);
      });

      if (this.community_alias) {
        this.core.api.getCommunity(this.community_alias).subscribe(Res => {
          this.community_data = Res;
          loading.dismiss();
          if (cb) cb(true);
        }, handleErr);
      } else handleErr();
    });
  }

  submitForm(from: any) {
    
    if (!from.valid) {
      this.core.createLoading().then(loading => {
        this.core.errorToast(loading, 'No has escrito ningún mensaje');
      });

      return;
    }

    if (this.data.users.length) {
      // parse data users
      let users:any = [];
      this.data.users.forEach(item => {
        users.push(item.uuid);
      });
      this.data.users = users;
      this.data.community = this.community_alias;

      this.core.createLoading().then(loading => {
        this.core.api.sendMessage(this.data).subscribe((data:any) => {
          this.core.successToast(loading, data.message, 3000);
          this.core.navCtrl.navigateRoot('/');

        }, err => this.core.errorToast(loading, err, 3000));
      });

    } else {
      this.core.createLoading().then(loading => {
        this.core.errorToast(loading, 'No has seleccionado ningún usuario');
      });
    }
  }
}
