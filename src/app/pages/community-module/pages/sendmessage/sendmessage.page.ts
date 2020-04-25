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
  data: {community:string, users: any[], message: string} = {
    community: '',
    users: [],
    message: ''
  };

  constructor(public core: CoreService, route: ActivatedRoute) {
    if (!this.core.isLoggedIn) {
      this.core.navCtrl.navigateRoot('/');
    }
    
    this.community_alias = route.snapshot.params.alias;
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
