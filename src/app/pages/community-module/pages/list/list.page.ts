import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/providers/core.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-community-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  data: any = null;

  constructor(public core: CoreService) { }

  ngOnInit() {
    this.core.api.getCommunities().subscribe(Res => {
      this.data = Res;
    }, () => this.core.errorToast());
  }

}
