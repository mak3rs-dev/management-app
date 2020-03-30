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
    this.refresh();
  }

  refresh = (page:number=1) => this.core.api.getCommunities(page).subscribe(Res => {
    this.data = Res;
  }, () => this.core.errorToast());

  first = this.refresh;

  prev() {
    if (this.data.current_page>1) {
      this.refresh(this.data.current_page-1);
    }
  }

  next() {
    if (this.data.current_page<this.data.last_page) {
      this.refresh(this.data.current_page-1);
    }
  }

  last() {
    if (this.data.current_page!=this.data.last_page) {
      this.refresh(this.data.last_page);
    }
  }

  detail(community) {
    this.core.navCtrl.navigateRoot('community/'+community.alias+'/detail');
  }

}
