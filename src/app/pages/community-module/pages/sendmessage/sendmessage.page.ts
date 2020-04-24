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
  data: {targets: any[], text: string} = {
    targets: [],
    text: ''
  };

  constructor(public core: CoreService, route: ActivatedRoute) {
    this.community_alias = route.snapshot.params.alias;
  }

  ionViewDidEnter() {

  }

}
